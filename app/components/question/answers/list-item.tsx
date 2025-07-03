import { CheckIcon, EllipsisIcon, PencilIcon, TrashIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { acceptAnswer, removeAnswer } from '~/apis/client/question';
import { AnswerEditForm } from '~/components/question/answers';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { UserAvatar, UserInline } from '~/components/user';
import { handleMessageError } from '~/lib/error';
import { parseRelativeTime } from '~/lib/parse';
import { cn } from '~/lib/utils';

interface AnswerListItemProps {
  answer: Answer;
  questionId: number;
  isWriter: boolean;
  isAcceptable: boolean;
  isEditable: boolean;
  isDeletable: boolean;
}

export default function AnswerListItem({
  answer,
  questionId,
  isWriter,
  isAcceptable,
  isEditable,
  isDeletable,
}: Readonly<AnswerListItemProps>) {
  const { content, accepted, writer, createdAt, updatedAt } = answer;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  function onClickAccept() {
    acceptAnswer(questionId, answer.id)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  function onClickEdit() {
    setIsEditing((prev) => !prev);
  }

  function onClickDelete() {
    removeAnswer(questionId, answer.id)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  return (
    <Card className="pt-0 overflow-hidden gap-0 pb-0">
      <div className="px-4 w-full h-16 flex items-center justify-end gap-2 border-b">
        <Button variant={'ghost'} className="mr-auto px-2">
          <Link to={`/@${writer.username}`}>
            <UserInline username={writer.username} />
          </Link>
        </Button>
        {isWriter && (
          <Badge variant="outline" className="rounded-full">
            <UserIcon /> 작성자
          </Badge>
        )}
        {accepted && (
          <Badge className="rounded-full">
            <CheckIcon /> 채택 완료
          </Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <Button variant="ghost" className="justify-start px-2.5" asChild>
              <Link to={`/@${writer.username}`}>
                <UserAvatar username={writer.username} size="sm" /> 프로필
              </Link>
            </Button>
            {isAcceptable && !accepted && (
              <Button variant="ghost" className="justify-start" onClick={onClickAccept}>
                <CheckIcon /> 채택하기
              </Button>
            )}
            {isEditable && (
              <Button variant="ghost" className="justify-start" onClick={onClickEdit}>
                <PencilIcon /> {isEditing ? '편집취소' : '편집하기'}
              </Button>
            )}
            {isDeletable && (
              <Button variant="ghost" className="justify-start" onClick={onClickDelete}>
                <TrashIcon /> 삭제하기
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isEditing ? (
        <AnswerEditForm
          questionId={questionId}
          answerId={answer.id}
          defaultContent={content.markdown}
          closeEditForm={() => setIsEditing(false)}
        />
      ) : (
        <CardContent className="p-6">
          <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
        </CardContent>
      )}
      {!isEditing && (
        <CardFooter className="pb-6">
          <hr className="mb-4" />
          <p className="text-muted-foreground text-sm text-right">
            <span>작성: {parseRelativeTime(createdAt)}</span>
            <span className={cn(createdAt === updatedAt ? 'hidden' : '')}>(수정: {parseRelativeTime(updatedAt)})</span>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
