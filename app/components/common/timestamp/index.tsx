import { parseRelativeTime } from '~/lib/parse';

interface TimestampProps {
  createdAt: string;
  updatedAt: string;
  showUpdated?: boolean;
}

export default function Timestamp({ createdAt, updatedAt, showUpdated = true }: Readonly<TimestampProps>) {
  return (
    <p className="text-center text-muted-foreground text-sm">
      <span>{parseRelativeTime(createdAt)} 작성</span>
      {showUpdated && createdAt !== updatedAt && <span className="ml-1">({parseRelativeTime(updatedAt)} 수정)</span>}
    </p>
  );
}
