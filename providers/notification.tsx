'use client';

import { countNotifications } from '@/apis/client/notifications';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

type NotificationContextProps = {
  notificationCount?: number;
};

export const NotificationContext = createContext<NotificationContextProps>({
  notificationCount: undefined,
});

export default function NotificationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { status } = useAuth();
  const { data } = useQuery({
    queryKey: ['countNotifications'],
    queryFn: countNotifications,
    refetchInterval: 30 * 1000, // 30 seconds,
    enabled: status === 'authenticated',
  });

  return (
    <NotificationContext.Provider value={{ notificationCount: data?.data }}>{children}</NotificationContext.Provider>
  );
}
