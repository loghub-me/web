'use client';

import { deleteNotification } from '@/apis/client/notifications';
import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonLink } from '@ui/button';
import { CheckIcon } from 'lucide-react';

interface NotificationListItemProps {
  notification: Notification;
}

export default function NotificationListItem({ notification }: Readonly<NotificationListItemProps>) {
  const { href, title, message, timestamp, type } = notification;
  const queryClient = useQueryClient();
  const { icon: TypeIcon, color: typeColor } = NOTIFICATION_TYPE_OPTIONS[type];
  function onNavigate() {
    queryClient.invalidateQueries({ queryKey: ['getNotifications'] });
    queryClient.invalidateQueries({ queryKey: ['countNotifications'] });
  }

  return (
    <div className={cn('flex gap-3.5 p-2 pl-4 pr-3 border-b last:border-b-0 items-center')}>
      <TypeIcon className={cn('size-5', typeColor)} />
      <div className="flex-1">
        <ButtonLink
          href={href}
          prefetch={false}
          onNavigate={onNavigate}
          variant={'link'}
          size={'sm'}
          className="p-0 w-fit h-auto"
        >
          {title}
        </ButtonLink>
        <h5 className="text-sm">{message}</h5>
      </div>
      <ButtonLink
        href={href}
        prefetch={false}
        onNavigate={() => deleteNotification(timestamp).then(() => onNavigate())}
        type={'button'}
        variant={'secondary'}
        className="border"
        size={'icon'}
      >
        <CheckIcon />
      </ButtonLink>
    </div>
  );
}
