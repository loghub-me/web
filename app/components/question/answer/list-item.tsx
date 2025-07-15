import { CheckIcon, EllipsisIcon, PencilIcon, TrashIcon, UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { acceptAnswer, removeAnswer } from '~/apis/client/question';
import { QuestionAnswerEditForm } from '~/components/question';
import { Badge } from '~/components/ui/badge';
import { Button, ButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { UserAvatar, UserLink } from '~/components/user';
import { handleMessageError } from '~/lib/error';

interface QuestionAnswerListItemProps {
  answer: QuestionAnswer;
  questionId: number;
  permission: AnswerPermission;
}

export default function QuestionAnswerListItem({
  answer,
  questionId,
  permission,
}: Readonly<QuestionAnswerListItemProps>) {
  const { content, accepted, writer } = answer;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="overflow-hidden py-0 gap-0">
      <CardHeader className="py-0 h-16 border-b flex items-center justify-start gap-2">
        <UserLink username={writer.username} />
        {permission.isWriter && (
          <Badge variant="outline" className="rounded-full">
            <UserIcon /> 작성자
          </Badge>
        )}
        {accepted && (
          <Badge className={'rounded-full bg-green-500 text-white [a&]:hover:bg-green-400'}>
            <CheckIcon /> 채택 완료
          </Badge>
        )}
        <AnswerMenu
          permission={permission}
          questionId={questionId}
          answerId={answer.id}
          answerWriter={writer}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent className="p-0">
        {isEditing ? (
          <QuestionAnswerEditForm
            questionId={questionId}
            answerId={answer.id}
            defaultContent={content.markdown}
            closeEditForm={() => setIsEditing(false)}
          />
        ) : (
          <div className="markdown-it p-4" dangerouslySetInnerHTML={{ __html: content.html }} />
        )}
      </CardContent>
    </Card>
  );
}

interface AnswerMenuProps {
  permission: AnswerPermission;
  questionId: number;
  answerId: number;
  answerWriter: User;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function AnswerMenu({ permission, questionId, answerId, answerWriter, setIsEditing }: Readonly<AnswerMenuProps>) {
  const navigate = useNavigate();
  const { isWriter, isAcceptable, isEditable, isDeletable } = permission;

  function onClickAccept() {
    acceptAnswer(questionId, answerId)
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
    removeAnswer(questionId, answerId)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="ml-auto rounded-full">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <ButtonLink to={`/@${answerWriter.username}`} className="justify-start px-2.5">
          <UserAvatar username="username" size="sm" /> 프로필
        </ButtonLink>
        {isAcceptable && (
          <Button variant="ghost" className="justify-start" onClick={onClickAccept}>
            <CheckIcon /> 채택하기
          </Button>
        )}
        {isEditable && (
          <Button variant="ghost" className="justify-start" onClick={onClickEdit}>
            <PencilIcon /> 편집하기
          </Button>
        )}
        {isDeletable && (
          <Button variant="ghost" className="justify-start" onClick={onClickDelete}>
            <TrashIcon /> 삭제하기
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
