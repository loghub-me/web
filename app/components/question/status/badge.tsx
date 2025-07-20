import { cva, type VariantProps } from 'class-variance-authority';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';

const badgeVariants = cva('rounded-full font-bold', {
  variants: {
    status: {
      OPEN: 'bg-yellow-500 text-white hover:bg-yellow-400',
      CLOSED: 'bg-red-500 text-white hover:bg-red-400',
      SOLVED: 'bg-green-500 text-white hover:bg-green-400',
    },
  },
});

export default function QuestionStatusBadge({ status }: Readonly<VariantProps<typeof badgeVariants>>) {
  return (
    <Badge className={cn(badgeVariants({ status }))} variant="default">
      {status}
    </Badge>
  );
}
