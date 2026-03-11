'use client';

import { UserAvatar, UserMention } from '@/components/client/user';
import { NOTIFICATION_TYPE_OPTIONS } from '@/constants/options';
import { useNotification } from '@/hooks/use-notification';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { SimpleTooltip } from '@ui/simple-tooltip';
import { RelativeTimestamp } from '@ui/timestamp';
import { DeleteIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface NotificationListItemProps {
  notification: NotificationDTO;
  closeMenu: () => void;
}

export default function NotificationListItem({ notification, closeMenu }: Readonly<NotificationListItemProps>) {
  const { href, title, message, createdAt, read, type, id, actor } = notification;
  const { icon: TypeIcon, color: typeColor } = NOTIFICATION_TYPE_OPTIONS[type];
  const { markNotificationAsRead, removeNotification } = useNotification();

  function onNavigate() {
    closeMenu();

    if (!read) {
      void markNotificationAsRead(id).catch(handleError);
    }
  }

  function onClickDelete() {
    void removeNotification(id).catch(handleError);
  }

  return (
    <div className="flex items-start gap-3 px-3 py-2 border-b last:border-0">
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
        <div className="flex items-center gap-1">
          <RelativeTimestamp createdAt={createdAt} />
          <SimpleTooltip
            content="댓글 삭제"
            render={<Button type={'button'} variant={'ghost'} size={'icon-xs'} onClick={onClickDelete} />}
          >
            <DeleteIcon className="text-muted-foreground" />
          </SimpleTooltip>
        </div>
      </div>
      <UserAvatar {...actor} className="mt-0.5" />
    </div>
  );
}
