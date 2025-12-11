'use client';

import { clientAPI } from './instance';

const getNotifications = async () => clientAPI.get('notifications').json<Notification[]>();
const countNotifications = async () => clientAPI.get('notifications/count').json<DataResponseBody<number>>();
const readNotification = async (timestamp: number) =>
  clientAPI.post(`notifications/${timestamp}/read`).json<MessageResponseBody>();
const deleteNotification = async (timestamp: number) =>
  clientAPI.delete(`notifications/${timestamp}`).json<MessageResponseBody>();

export { getNotifications, countNotifications, readNotification, deleteNotification };
