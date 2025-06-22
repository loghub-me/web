import { CheckIcon, MessagesSquareIcon, XIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

interface QuestionStatusBadgeProps {
  status: QuestionStatus;
}

export default function QuestionStatusBadge({ status }: Readonly<QuestionStatusBadgeProps>) {
  const defaultStyle = 'rounded-full';

  switch (status) {
    case 'OPEN':
      return (
        <Badge variant={'outline'} className={defaultStyle}>
          <MessagesSquareIcon /> OPEN
        </Badge>
      );
    case 'CLOSED':
      return (
        <Badge variant={'destructive'} className={defaultStyle}>
          <XIcon /> CLOSED
        </Badge>
      );
    case 'SOLVED':
      return (
        <Badge variant={'success'} className={defaultStyle}>
          <CheckIcon /> SOLVED
        </Badge>
      );
  }
}
