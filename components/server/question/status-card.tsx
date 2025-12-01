import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

interface QuestionStatusCardProps {
  question: Pick<QuestionDetail, 'title' | 'status'>;
}

export default function QuestionStatusCard({ question }: Readonly<QuestionStatusCardProps>) {
  const { title, status } = question;
  const { label: statusLabel, icon: StatusIcon, color: statusColor } = QUESTION_STATUS_OPTIONS[status];

  return (
    <Card className="gap-3">
      <CardHeader className="flex items-center gap-2">
        <CardTitle className="pl-2 text-sm text-muted-foreground">질문</CardTitle>
        <Badge variant={'secondary'} className="px-1">
          <StatusIcon className={statusColor} /> {statusLabel}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-3">
        <ButtonLink
          href={`#${encodeURIComponent('question')}`}
          size={'sm'}
          className="px-2 py-1.5 min-h-9 h-auto justify-start whitespace-normal"
        >
          {title}
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
