'use client';

import { NotificationContext } from '@/providers/notification';
import { useContext } from 'react';

export const useNotification = () => useContext(NotificationContext);
