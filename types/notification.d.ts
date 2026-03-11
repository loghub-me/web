interface NotificationDTO {
  id: number;
  href: string;
  title: string;
  message: string;
  read: boolean;
  type: NotificationType;
  createdAt: string;
  actor: User;
}

type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

interface NotificationConnectedEvent {
  connectedAt: number;
  recipientId: number;
}

interface NotificationCreatedEvent {
  data: NotificationDTO;
  recipientId: number;
}

interface NotificationReadEvent {
  notificationId: number;
  recipientId: number;
}

interface NotificationReadAllEvent {
  readCount: number;
  recipientId: number;
}

interface NotificationDeletedEvent {
  notificationId: number;
  recipientId: number;
}

interface NotificationPingEvent {
  recipientId: number;
}

interface NotificationStreamEventMap {
  'notification.connected': NotificationConnectedEvent;
  'notification.created': NotificationCreatedEvent;
  'notification.read': NotificationReadEvent;
  'notification.read_all': NotificationReadAllEvent;
  'notification.deleted': NotificationDeletedEvent;
  'notification.ping': NotificationPingEvent;
}

type NotificationStreamEventName = keyof NotificationStreamEventMap;

type NotificationStreamEventPayload<K extends NotificationStreamEventName = NotificationStreamEventName> =
  NotificationStreamEventMap[K];
