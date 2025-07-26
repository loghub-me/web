import { parseRelativeTime } from '~/lib/parse';
import { cn } from '~/lib/utils';

interface TimestampProps {
  createdAt: string;
  updatedAt: string;
  className?: string;
  showUpdated?: boolean;
}

export default function Timestamp({ createdAt, updatedAt, className, showUpdated = true }: Readonly<TimestampProps>) {
  return (
    <p className={cn('text-center text-muted-foreground text-sm', className)}>
      <span>{parseRelativeTime(createdAt)} 작성</span>
      {showUpdated && createdAt !== updatedAt && <span className="ml-1">({parseRelativeTime(updatedAt)} 수정)</span>}
    </p>
  );
}
