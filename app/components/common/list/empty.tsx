import { WavesIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

interface ListEmptyProps {
  message?: string;
  className?: string;
}

const defaultMessage = '아직 항목이 없습니다.';
export default function ListEmpty({ message = defaultMessage, className }: Readonly<ListEmptyProps>) {
  return (
    <p className={cn('py-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5', className)}>
      <WavesIcon className="size-4" /> {message}
    </p>
  );
}
