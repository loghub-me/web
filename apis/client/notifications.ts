'use client';

import { clientAPI } from './instance';
import { parseServerSentEvents } from 'parse-sse';

const streamNotifications = async (lastEventId?: string, signal?: AbortSignal) =>
  parseServerSentEvents(
    await clientAPI.get('notifications/stream', {
      timeout: false,
      cache: 'no-store',
      signal,
      headers: {
        Accept: 'text/event-stream',
        ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
      },
    })
  );

const getNotifications = async (cursor?: number) =>
  clientAPI.get('notifications', { searchParams: { cursor } }).json<NotificationDTO[]>();
const countUnreadNotifications = async () =>
  clientAPI
    .get('notifications/unread/count')
    .json<DataResponseBody<number>>()
    .then(({ data }) => data);

const readNotification = async (notificationId: number) =>
  clientAPI.patch(`notifications/${notificationId}/read`).json<MessageResponseBody>();
const readAllNotifications = async () => clientAPI.patch('notifications/all/read').json<MessageResponseBody>();
const deleteNotification = async (notificationId: number) =>
  clientAPI.delete(`notifications/${notificationId}`).json<MessageResponseBody>();

export { streamNotifications };
export { getNotifications, countUnreadNotifications };
export { readNotification, readAllNotifications, deleteNotification };
