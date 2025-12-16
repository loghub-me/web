'use client';

import { closeQuestion, deleteQuestion } from '@/apis/client/question';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { CircleXIcon, EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionActionMenuProps {
  question: Pick<QuestionDetail, 'id' | 'status' | 'writer'>;
}

export default function QuestionActionMenu({ question }: Readonly<QuestionActionMenuProps>) {
  const { status, writer } = question;
  const { session } = useAuth();

  return (
    session?.id === writer.id && (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <QuestionEditLink questionId={question.id} />
          <QuestionDeleteButton questionId={question.id} />
          {status === 'OPEN' && <QuestionCloseButton questionId={question.id} />}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function QuestionEditLink({ questionId }: Readonly<{ questionId: number }>) {
  return (
    <ButtonLink href={`/edit/questions/${questionId}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function QuestionDeleteButton({ questionId }: Readonly<{ questionId: number }>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteQuestion(questionId)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/search/questions');
      })
      .catch(handleError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <TrashIcon className="mr-0.5" /> 삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 질문은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" variant="destructive" onClick={onDeleteButtonClick}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuestionCloseButton({ questionId }: Readonly<{ questionId: number }>) {
  const router = useRouter();

  function onCloseButtonClick() {
    closeQuestion(questionId)
      .then(({ message }) => {
        toast.success(message, { icon: <CircleXIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'} className="justify-start">
          <CircleXIcon className="mr-0.5" /> 닫기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 질문을 닫겠습니까?</DialogTitle>
          <DialogDescription>닫은 질문은 복구할 수 없습니다. 정말로 닫겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" variant={'secondary'} className="border-border" onClick={onCloseButtonClick}>
            <CircleXIcon className={cn(QUESTION_STATUS_OPTIONS['CLOSED'].color)} /> 닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
