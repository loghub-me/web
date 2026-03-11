import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { id, username } = zodFields;

const userSchema = z.object({
  id,
  username,
});

const notificationTypeSchema = z.literal(['INFO', 'SUCCESS', 'WARNING', 'ERROR'], {
  message: '잘못된 알림 유형입니다.',
});

const notificationSchema = z.object({
  id,
  href: z.string(),
  title: z.string(),
  message: z.string(),
  read: z.boolean(),
  type: notificationTypeSchema,
  createdAt: z.string(),
  actor: userSchema,
});

const notificationConnectedEventSchema = z.object({
  connectedAt: z.number(),
  recipientId: id,
});
const notificationCreatedEventSchema = z.object({
  data: notificationSchema,
  recipientId: id,
});
const notificationReadEventSchema = z.object({
  notificationId: id,
  recipientId: id,
});
const notificationReadAllEventSchema = z.object({
  readCount: z.number(),
  recipientId: id,
});
const notificationDeletedEventSchema = z.object({
  notificationId: id,
  recipientId: id,
});
const notificationPingEventSchema = z.object({
  recipientId: id,
});

const notificationStreamEventSchemas = {
  'notification.connected': notificationConnectedEventSchema,
  'notification.created': notificationCreatedEventSchema,
  'notification.read': notificationReadEventSchema,
  'notification.read_all': notificationReadAllEventSchema,
  'notification.deleted': notificationDeletedEventSchema,
  'notification.ping': notificationPingEventSchema,
} satisfies Record<NotificationStreamEventName, z.ZodTypeAny>;

export {
  userSchema,
  notificationTypeSchema,
  notificationSchema,
  notificationConnectedEventSchema,
  notificationCreatedEventSchema,
  notificationReadEventSchema,
  notificationReadAllEventSchema,
  notificationDeletedEventSchema,
  notificationPingEventSchema,
  notificationStreamEventSchemas,
};
