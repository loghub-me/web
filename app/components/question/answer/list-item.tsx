import { CheckIcon, UserRoundPenIcon } from 'lucide-react';
import { useState } from 'react';
import { QuestionAnswerEditForm, QuestionAnswerMenu } from '~/components/question';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { UserAvatar, UserRoleBadge } from '~/components/user';
import { cn } from '~/lib/utils';

interface QuestionAnswerListItemProps {
  answer: QuestionAnswer;
  question: QuestionDetail;
}

export default function QuestionAnswerListItem({ answer, question }: Readonly<QuestionAnswerListItemProps>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card id={`answer-${answer.id}`} className={cn('gap-0 pb-0 overflow-hidden', isEditing && 'hidden')}>
        <CardHeader className="flex items-center gap-2 pb-4 border-b">
          <UserAvatar {...answer.writer} />
          <UserRoleBadge {...answer.writer} />
          <h3 className="text-sm font-medium truncate">{answer.title}</h3>
          {answer.accepted && (
            <Badge variant={'success'}>
              <CheckIcon /> 채택완료
            </Badge>
          )}
          {question.writer.id === answer.writer.id && (
            <Badge variant={'secondary'}>
              <UserRoundPenIcon /> 질문자
            </Badge>
          )}
          <QuestionAnswerMenu question={question} answer={answer} setIsEditing={setIsEditing} />
        </CardHeader>
        <CardContent className="py-4">
          <div className="markdown-it" dangerouslySetInnerHTML={{ __html: answer.content.html }} />
        </CardContent>
      </Card>
      {isEditing && (
        <QuestionAnswerEditForm question={question} answer={answer} closeEditForm={() => setIsEditing(false)} />
      )}
    </>
  );
}
