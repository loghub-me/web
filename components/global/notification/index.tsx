'use client';

import NotificationListItem from '@/components/global/notification/list-item';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from '@/hooks/use-notification';
import { handleError } from '@/lib/error';
import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/dropdown-menu';
import ListEmpty from '@ui/list-empty';
import { CheckCheckIcon, BellDotIcon, BellIcon } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function GlobalNotification() {
  const { session } = useAuth();
  const { unreadCount, notifications, refreshNotifications, markAllNotificationsAsRead } = useNotification();
  const [open, setOpen] = useState(false);
  const [isMarkingAllAsRead, startTransition] = useTransition();

  function closeMenu() {
    setOpen(false);
  }

  function onOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      void refreshNotifications().catch(handleError);
    }
  }

  function onClickReadAll() {
    startTransition(async () => {
      try {
        await markAllNotificationsAsRead();
      } catch (error) {
        handleError(error);
      }
    });
  }

  return (
    session && (
      <DropdownMenu modal={false} open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger render={<Button type={'button'} variant={open ? 'secondary' : 'outline'} size={'icon'} />}>
          {unreadCount > 0 ? <BellDotIcon className="text-yellow-600" /> : <BellIcon />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 w-80 max-w-80">
          <div className="pl-3 pr-1 py-1 flex items-center justify-between gap-2">
            <h5 className="font-medium">알림</h5>
            <Button
              type="button"
              variant={'ghost'}
              size={'sm'}
              disabled={unreadCount === 0 || isMarkingAllAsRead}
              onClick={onClickReadAll}
            >
              <CheckCheckIcon /> 모두 읽음
            </Button>
          </div>
          <DropdownMenuSeparator />
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.length === 0 && <ListEmpty message={'알림이 없습니다'} className="p-4" />}
            {notifications.map((notification) => (
              <NotificationListItem key={notification.id} notification={notification} closeMenu={closeMenu} />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
