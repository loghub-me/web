'use client';

import {
  streamNotifications,
  getNotifications,
  countUnreadNotifications,
  readNotification as readNotificationRequest,
  readAllNotifications as readAllNotificationsRequest,
  deleteNotification as deleteNotificationRequest,
} from '@/apis/client/notifications';
import { useAuth } from '@/hooks/use-auth';
import { notificationStreamEventSchemas } from '@/schemas/notifications';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ServerSentEvent } from 'parse-sse';
import { createContext, useEffect, useRef } from 'react';

const notificationsQueryKey = ['getNotifications'] as const;
const unreadNotificationsCountQueryKey = ['countUnreadNotifications'] as const;
const queryKeys = [notificationsQueryKey, unreadNotificationsCountQueryKey] as const;
const NOTIFICATION_STREAM_RETRY_DELAY = 3_000;

type NotificationContextProps = {
  unreadCount: number;
  notifications: NotificationDTO[];
  refreshNotifications: () => Promise<void>;
  markNotificationAsRead: (notificationId: number) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  removeNotification: (notificationId: number) => Promise<void>;
};

export const NotificationContext = createContext<NotificationContextProps>({
  unreadCount: 0,
  notifications: [],
  refreshNotifications: async () => {},
  markNotificationAsRead: async () => {},
  markAllNotificationsAsRead: async () => {},
  removeNotification: async () => {},
});

function setUnreadNotificationCount(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (currentCount: number) => number
) {
  queryClient.setQueryData<number>(unreadNotificationsCountQueryKey, (currentCount = 0) =>
    Math.max(0, updater(currentCount))
  );
}

function applyNotificationCreated(queryClient: ReturnType<typeof useQueryClient>, notification: NotificationDTO) {
  const notifications = queryClient.getQueryData<NotificationDTO[]>(notificationsQueryKey) || [];
  const inserted = !notifications.some(({ id }) => id === notification.id);
  const nextNotifications = [notification, ...notifications.filter(({ id }) => id !== notification.id)];

  queryClient.setQueryData(notificationsQueryKey, nextNotifications);

  if (inserted && !notification.read) {
    setUnreadNotificationCount(queryClient, (currentCount) => currentCount + 1);
  }
}

function applyNotificationRead(queryClient: ReturnType<typeof useQueryClient>, notificationId: number) {
  const notifications = queryClient.getQueryData<NotificationDTO[]>(notificationsQueryKey) || [];
  let found = false;
  let unreadChanged = false;
  const nextNotifications = notifications.map((notification) => {
    if (notification.id !== notificationId) {
      return notification;
    }

    found = true;

    if (notification.read) {
      return notification;
    }

    unreadChanged = true;
    return { ...notification, read: true };
  });

  queryClient.setQueryData(notificationsQueryKey, nextNotifications);

  if (unreadChanged || !found) {
    setUnreadNotificationCount(queryClient, (currentCount) => currentCount - 1);
  }
}

function applyNotificationsReadAll(queryClient: ReturnType<typeof useQueryClient>) {
  const notifications = queryClient.getQueryData<NotificationDTO[]>(notificationsQueryKey) || [];
  queryClient.setQueryData(
    notificationsQueryKey,
    notifications.map((notification) => (notification.read ? notification : { ...notification, read: true }))
  );
  queryClient.setQueryData(unreadNotificationsCountQueryKey, 0);
}

function applyNotificationDeleted(queryClient: ReturnType<typeof useQueryClient>, notificationId: number) {
  const notifications = queryClient.getQueryData<NotificationDTO[]>(notificationsQueryKey) || [];
  const notificationToDelete = notifications.find(({ id }) => id === notificationId);

  queryClient.setQueryData(
    notificationsQueryKey,
    notifications.filter(({ id }) => id !== notificationId)
  );

  if (!notificationToDelete) {
    void queryClient.invalidateQueries({ queryKey: unreadNotificationsCountQueryKey });
    return;
  }

  if (!notificationToDelete.read) {
    setUnreadNotificationCount(queryClient, (currentCount) => currentCount - 1);
  }
}

function parseNotificationStreamEvent<T extends NotificationStreamEventName>(
  event: ServerSentEvent,
  eventType: T
): NotificationStreamEventPayload<T> | null {
  if (event.type !== eventType) {
    return null;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.data);
  } catch {
    console.error(`Failed to parse notification event payload for ${event.type}`);
    return null;
  }

  const { data, success } = notificationStreamEventSchemas[eventType].safeParse(payload);

  if (!success) {
    console.error(`Invalid notification event payload for ${event.type}`);
    return null;
  }

  return data as NotificationStreamEventPayload<T>;
}

export default function NotificationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { status } = useAuth();
  const queryClient = useQueryClient();
  const lastEventIdRef = useRef<string>(undefined);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const { data: unreadCount } = useQuery({
    queryKey: unreadNotificationsCountQueryKey,
    queryFn: () => countUnreadNotifications(),
    enabled: status === 'authenticated',
    retry: false,
  });
  const { data: notifications } = useQuery({
    queryKey: notificationsQueryKey,
    queryFn: () => getNotifications(),
    enabled: status === 'authenticated',
    retry: false,
  });

  useEffect(() => {
    if (status !== 'unauthenticated') {
      return;
    }

    lastEventIdRef.current = undefined;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    queryKeys.forEach((queryKey) => queryClient.removeQueries({ queryKey }));
  }, [queryClient, status]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    let cancelled = false;
    let reconnectDelay = NOTIFICATION_STREAM_RETRY_DELAY;
    let abortController: AbortController | null = null;

    const handleNotificationEvent = (event: ServerSentEvent) => {
      if (event.lastEventId) {
        lastEventIdRef.current = event.lastEventId;
      }

      if (event.retry) {
        reconnectDelay = event.retry;
      }

      const connectedEvent = parseNotificationStreamEvent(event, 'notification.connected');
      if (connectedEvent) {
        return;
      }

      const createdEvent = parseNotificationStreamEvent(event, 'notification.created');
      if (createdEvent) {
        applyNotificationCreated(queryClient, createdEvent.data);
        return;
      }

      const readEvent = parseNotificationStreamEvent(event, 'notification.read');
      if (readEvent) {
        applyNotificationRead(queryClient, readEvent.notificationId);
        return;
      }

      const readAllEvent = parseNotificationStreamEvent(event, 'notification.read_all');
      if (readAllEvent) {
        applyNotificationsReadAll(queryClient);
        return;
      }

      const deletedEvent = parseNotificationStreamEvent(event, 'notification.deleted');
      if (deletedEvent) {
        applyNotificationDeleted(queryClient, deletedEvent.notificationId);
        return;
      }

      const pingEvent = parseNotificationStreamEvent(event, 'notification.ping');
      if (pingEvent) {
        return;
      }
    };

    const connect = async () => {
      abortController = new AbortController();

      try {
        const notificationStream = await streamNotifications(lastEventIdRef.current, abortController.signal);
        const reader = notificationStream.getReader();

        while (true) {
          const { done, value } = await reader.read();

          if (done || cancelled) {
            break;
          }

          if (!value) {
            continue;
          }

          if (cancelled) {
            return;
          }

          handleNotificationEvent(value);
        }
      } catch {
        if (!abortController.signal.aborted) {
          console.warn('Notification stream disconnected');
        }
      } finally {
        if (cancelled || abortController.signal.aborted) {
          return;
        }

        reconnectTimeoutRef.current = setTimeout(() => {
          void connect();
        }, reconnectDelay);
      }
    };

    void connect();

    return () => {
      cancelled = true;
      abortController?.abort();

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [queryClient, status]);

  async function refreshNotifications() {
    await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
  }

  async function markNotificationAsRead(notificationId: number) {
    await readNotificationRequest(notificationId);
    applyNotificationRead(queryClient, notificationId);
  }

  async function markAllNotificationsAsRead() {
    await readAllNotificationsRequest();
    applyNotificationsReadAll(queryClient);
  }

  async function removeNotification(notificationId: number) {
    await deleteNotificationRequest(notificationId);
    applyNotificationDeleted(queryClient, notificationId);
  }

  return (
    <NotificationContext.Provider
      value={{
        unreadCount: unreadCount || 0,
        notifications: notifications || [],
        refreshNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
