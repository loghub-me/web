import { CheckIcon, EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { acceptAnswer, removeAnswer } from '~/apis/client/question';
import { Button, ButtonLink } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { UserAvatar } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';

interface QuestionAnswerMenuProps {
  question: {
    id: number;
    status: QuestionStatus;
    writer: User;
  };
  answer: {
    id: number;
    writer: User;
  };
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuestionAnswerMenu({ question, answer, setIsEditing }: Readonly<QuestionAnswerMenuProps>) {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  const permissions = {
    acceptable:
      question.status === 'OPEN' && question.writer.id !== answer.writer.id && session?.id == question.writer.id,
    editable: question.status === 'OPEN' && session?.id == answer.writer.id,
    removable: question.status === 'OPEN' && session?.id == answer.writer.id,
  };

  function onClickAccept() {
    acceptAnswer(question.id, answer.id)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError)
      .finally(() => setOpen(false));
  }

  function onClickEdit() {
    setIsEditing(true);
    setOpen(false);
  }

  function onClickRemove() {
    removeAnswer(question.id, answer.id)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError)
      .finally(() => setOpen(false));
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant={'ghost'} size={'icon'} className="ml-auto rounded-full">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <ButtonLink to={`/@${answer.writer.username}`} className="justify-start px-2.5">
          <UserAvatar {...answer.writer} size="sm" /> 프로필
        </ButtonLink>
        {permissions.acceptable && (
          <Button variant={'ghost'} className="justify-start" onClick={onClickAccept}>
            <CheckIcon /> 채택하기
          </Button>
        )}
        {permissions.editable && (
          <Button variant={'ghost'} className="justify-start" onClick={onClickEdit}>
            <PencilIcon /> 수정하기
          </Button>
        )}
        {permissions.removable && (
          <Button variant={'ghost'} className="justify-start" onClick={onClickRemove}>
            <TrashIcon /> 삭제하기
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
