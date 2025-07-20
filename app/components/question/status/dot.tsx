import { cva, type VariantProps } from 'class-variance-authority';
import { CircleIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

const dotVariants = cva('min-w-2 min-h-2 max-w-2 max-h-2 fill-current', {
  variants: {
    status: {
      OPEN: 'text-yellow-500',
      CLOSED: 'text-red-500',
      SOLVED: 'text-green-500',
    },
  },
  defaultVariants: { status: 'OPEN' },
});

export default function QuestionStatusDot({ status }: Readonly<VariantProps<typeof dotVariants>>) {
  return <CircleIcon className={cn(dotVariants({ status }))} />;
}
