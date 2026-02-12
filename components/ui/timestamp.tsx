import { parseRelativeTime } from '@/lib/parse';
import { cn } from '@/lib/utils';

interface TimestampProps {
  createdAt?: string | number;
  publishedAt?: string;
  updatedAt?: string;
  className?: string;
}

export function Timestamp({ createdAt, publishedAt, updatedAt, className }: Readonly<TimestampProps>) {
  const firstTime = createdAt ? createdAt : publishedAt;
  const showUpdatedAt = updatedAt && firstTime !== updatedAt;

  if (!firstTime) {
    return null;
  }

  return (
    <time className={cn('text-xs text-muted-foreground font-medium', className)}>
      {new Date(firstTime).toLocaleString('ko-KR')}
      {showUpdatedAt && ` (${parseRelativeTime(updatedAt)} 수정)`}
    </time>
  );
}

interface RelativeTimestampProps {
  createdAt?: string | number;
  publishedAt?: string;
  updatedAt?: string;
  className?: string;
}

export function RelativeTimestamp({ createdAt, publishedAt, updatedAt, className }: Readonly<RelativeTimestampProps>) {
  const firstTime = createdAt ? createdAt : publishedAt;
  const showUpdatedAt = updatedAt && firstTime !== updatedAt;

  if (!firstTime) {
    return null;
  }

  return (
    <time className={cn('text-xs text-muted-foreground font-medium', className)}>
      {parseRelativeTime(firstTime)}
      {showUpdatedAt && ` (${parseRelativeTime(updatedAt)} 수정)`}
    </time>
  );
}
