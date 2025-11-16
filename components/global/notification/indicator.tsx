'use client';

import { useAuth } from '@/hooks/use-auth';
import { useNotification } from '@/hooks/use-notification';
import { ButtonLink } from '@ui/button';
import { Skeleton } from '@ui/skeleton';
import { BellDotIcon, BellIcon } from 'lucide-react';

export default function GlobalNotificationIndicator() {
  const { status } = useAuth();
  const { notificationCount } = useNotification();

  if (status === 'loading') {
    return <Skeleton className="size-9" />;
  }

  return (
    status === 'authenticated' &&
    notificationCount !== undefined && (
      <ButtonLink href={'/notifications'} variant={'outline'} size={'icon'}>
        {notificationCount > 0 ? <BellDotIcon className="text-yellow-600" /> : <BellIcon />}
      </ButtonLink>
    )
  );
}
