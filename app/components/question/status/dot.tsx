import { CircleIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

const colors: Record<QuestionStatus, string> = {
  OPEN: 'text-yellow-500',
  CLOSED: 'text-red-500',
  SOLVED: 'text-green-500',
};

interface QuestionStatusDotProps {
  status: QuestionStatus;
}

export default function QuestionStatusDot({ status }: Readonly<QuestionStatusDotProps>) {
  return <CircleIcon className={cn('min-w-2 min-h-2 max-w-2 max-h-2 fill-current', colors[status])} />;
}
