'use client';

import { getNotifications } from '@/apis/client/notifications';
import { NotificationList, NotificationListItem, NotificationListSkeleton } from '@/components/client/notification';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import ListEmpty from '@ui/list-empty';

export default function NotificationPage() {
  const { status } = useAuth();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: getNotifications,
    enabled: status === 'authenticated',
  });

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      <NotificationList>
        {isLoading && <NotificationListSkeleton />}
        {notifications?.length === 0 && !isLoading && (
          <ListEmpty message={'확인하지 않은 알림이 없습니다.'} className="py-4" />
        )}
        {notifications?.map((notification) => (
          <NotificationListItem key={notification.timestamp} notification={notification} />
        ))}
      </NotificationList>
    </main>
  );
}
