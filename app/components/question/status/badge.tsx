import { Badge } from '~/components/ui/badge';

const variants: Record<QuestionStatus, { label: string; color: string }> = {
  OPEN: {
    label: 'OPEN',
    color: 'bg-yellow-500 [a&]:hover:bg-yellow-400 text-white',
  },
  CLOSED: {
    label: 'CLOSED',
    color: 'bg-red-500 text-white [a&]:hover:bg-red-400',
  },
  SOLVED: {
    label: 'SOLVED',
    color: 'bg-green-500 text-white [a&]:hover:bg-green-400',
  },
};

interface QuestionStatusBadgeProps {
  status: QuestionStatus;
}

export default function QuestionStatusBadge({ status }: Readonly<QuestionStatusBadgeProps>) {
  const defaultStyle = 'rounded-full';

  return (
    <Badge className={`${defaultStyle} ${variants[status].color}`} variant="default" asChild>
      <span className="flex items-center gap-1">{variants[status].label}</span>
    </Badge>
  );
}
