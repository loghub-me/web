'use client';

import NotificationListItem from '@/components/global/notification/list-item';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from '@/hooks/use-notification';
import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import ListEmpty from '@ui/list-empty';
import { Skeleton } from '@ui/skeleton';
import { BellDotIcon, BellIcon } from 'lucide-react';

export default function GlobalNotification() {
  const { status } = useAuth();
  const { notificationCount, notifications, refetchNotifications } = useNotification();

  switch (status) {
    case 'loading':
      return <Skeleton className="size-9" />;
    case 'unauthenticated':
      return null;
    case 'authenticated':
      return (
        <DropdownMenu onOpenChange={(value) => value && refetchNotifications()}>
          <DropdownMenuTrigger render={<Button type={'button'} variant={'outline'} size={'icon'} />}>
            {notificationCount > 0 ? <BellDotIcon className="text-yellow-600" /> : <BellIcon />}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0 max-w-xs w-full max-h-96 overflow-auto">
            {notifications.length === 0 && <ListEmpty message={'알림이 없습니다'} className="p-4" />}
            {notifications.map((notification) => (
              <NotificationListItem key={notification.timestamp} notification={notification} />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}
