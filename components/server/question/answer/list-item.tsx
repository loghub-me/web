import { QuestionAnswerAcceptButton, QuestionAnswerActionMenu } from '@/components/client/question';
import { UserLink } from '@/components/client/user';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@ui/card';
import Timestamp from '@ui/timestamp';
import { CircleCheckIcon } from 'lucide-react';

interface QuestionAnswerListItemProps {
  answer: QuestionAnswer;
  question: Pick<Question, 'id' | 'status' | 'writer'>;
}

export default function QuestionAnswerListItem({ answer, question }: Readonly<QuestionAnswerListItemProps>) {
  const { title, content, accepted, writer } = answer;

  return (
    <Card id={`answer-${answer.id}`} className="pt-0">
      <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
        <h4 className="flex-1 text-lg font-semibold line-clamp-2">{title}</h4>
        {accepted && (
          <Badge variant={'outline'} size={'lg'}>
            <CircleCheckIcon className={QUESTION_STATUS_OPTIONS['SOLVED'].color} /> 채택
          </Badge>
        )}
        {question.status === 'OPEN' && <QuestionAnswerAcceptButton question={question} answerId={answer.id} />}
        <QuestionAnswerActionMenu questionId={question.id} answer={answer} />
      </CardHeader>
      <CardContent className="pb-4 border-b">
        <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <UserLink {...writer} />
        <Timestamp {...answer} />
      </CardFooter>
    </Card>
  );
}
