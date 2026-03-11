'use client';

import { UserAvatar, UserMention } from '@/components/client/user';
import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options';
import { useNotification } from '@/hooks/use-notification';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { RelativeTimestamp } from '@ui/timestamp';
import Link from 'next/link';

interface NotificationListItemProps {
  notification: NotificationDTO;
  closeMenu: () => void;
}

export default function NotificationListItem({ notification, closeMenu }: Readonly<NotificationListItemProps>) {
  const { href, title, message, createdAt, read, type, id, actor } = notification;
  const { icon: TypeIcon, color: typeColor } = NOTIFICATION_TYPE_OPTIONS[type];
  const { markNotificationAsRead } = useNotification();

  function onNavigate() {
    closeMenu();

    if (!read) {
      void markNotificationAsRead(id).catch(handleError);
    }
  }

  return (
    <div className="flex items-start gap-3 px-3 py-2">
      <TypeIcon className={cn('mt-0.5 size-4.5', typeColor)} />
      <div className="flex-1 space-y-0.5">
        <p className={cn('text-sm leading-normal', read && 'text-muted-foreground')}>
          <UserMention {...actor} />
          님이{' '}
          <Link href={href} prefetch={false} onNavigate={onNavigate} className="text-primary hover:underline">
            {title}
          </Link>{' '}
          에 <span>{message}</span>
        </p>
        <RelativeTimestamp createdAt={createdAt} />
      </div>
      <UserAvatar {...actor} className="mt-0.5" />
    </div>
  );
}
