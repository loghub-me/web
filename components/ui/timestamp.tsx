import { parseRelativeTime } from '@/lib/parse';
import { cn } from '@/lib/utils';

interface TimestampProps {
  createdAt: string | number;
  updatedAt?: string;
  className?: string;
}

export default function Timestamp({ createdAt, updatedAt, className }: Readonly<TimestampProps>) {
  const showUpdatedAt = updatedAt && createdAt !== updatedAt;

  return (
    <time className={cn('text-xs text-muted-foreground font-medium', className)}>
      {parseRelativeTime(createdAt)} {showUpdatedAt ? `(수정: ${parseRelativeTime(updatedAt)})` : ''}
    </time>
  );
}
