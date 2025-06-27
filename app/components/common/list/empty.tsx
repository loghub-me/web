import { WavesIcon } from 'lucide-react';

interface ListEmptyProps {
  message?: string;
}

const defaultMessage = '아직 항목이 없습니다.';
export default function ListEmpty({ message = defaultMessage }: Readonly<ListEmptyProps>) {
  return (
    <p className="py-8 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
      <WavesIcon className="size-4" /> {message}
    </p>
  );
}
