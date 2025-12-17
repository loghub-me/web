'use client';

import { countNotifications, getNotifications } from '@/apis/client/notifications';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

type NotificationContextProps = {
  notificationCount: number;
  notifications: Notification[];
  refetchNotifications: () => void;
};

export const NotificationContext = createContext<NotificationContextProps>({
  notificationCount: 0,
  notifications: [],
  refetchNotifications: () => {},
});

export default function NotificationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { status } = useAuth();
  const { data: notificationCount } = useQuery({
    queryKey: ['countNotifications'],
    queryFn: countNotifications,
    refetchInterval: 30 * 1000, // 30 seconds,
    enabled: status === 'authenticated',
    retry: false,
  });
  const { data: notifications, refetch } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: getNotifications,
    enabled: status === 'authenticated',
    retry: false,
  });

  return (
    <NotificationContext.Provider
      value={{
        notificationCount: notificationCount?.data || 0,
        notifications: notifications || [],
        refetchNotifications: refetch,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
