'use client';

import { deleteNotification } from '@/apis/client/notifications';
import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonLink } from '@ui/button-link';
import { DropdownMenuItem } from '@ui/dropdown-menu';
import Timestamp from '@ui/timestamp';

interface NotificationListItemProps {
  notification: Notification;
}

export default function NotificationListItem({ notification }: Readonly<NotificationListItemProps>) {
  const { href, title, message, timestamp, type } = notification;
  const queryClient = useQueryClient();
  const { icon: TypeIcon, color: typeColor } = NOTIFICATION_TYPE_OPTIONS[type];
  function onNavigate() {
    deleteNotification(timestamp).then(() => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['countNotifications'] });
    });
  }

  return (
    <div className={cn('flex flex-col p-3 border-b last:border-b-0')}>
      <DropdownMenuItem asChild>
        <ButtonLink
          href={href}
          prefetch={false}
          onNavigate={onNavigate}
          variant={'link'}
          size={'sm'}
          className="has-[>svg]:p-0 w-fit h-auto"
        >
          <TypeIcon className={cn(typeColor)} /> {title}
        </ButtonLink>
      </DropdownMenuItem>
      <p className="pl-5 text-sm">{message}</p>
      <Timestamp createdAt={timestamp} className="ml-auto" />
    </div>
  );
}
