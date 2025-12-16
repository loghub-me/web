'use client';

import { acceptQuestionAnswer } from '@/apis/client/question';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
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
import { GlowEffect } from '@ui/glow-effect';
import { CheckCircleIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface QuestionAnswerAcceptButtonProps {
  question: Pick<Question, 'id' | 'writer'>;
  answerId: number;
}

export default function QuestionAnswerAcceptButton({ question, answerId }: Readonly<QuestionAnswerAcceptButtonProps>) {
  const { session } = useAuth();
  const router = useRouter();

  function onAcceptButtonClick() {
    acceptQuestionAnswer(question.id, answerId)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.refresh();
      })
      .catch(handleError);
  }

  return (
    session?.id === question.writer.id && (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            className="relative overflow-hidden rounded-full border-purple-400/40 dark:border-purple-400/40"
          >
            <GlowEffect color={'bg-purple-400'} />
            <CheckCircleIcon className={cn('mr-0.5', QUESTION_STATUS_OPTIONS['SOLVED'].color)} /> 채택하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말로 채택하시겠습니까?</DialogTitle>
            <DialogDescription>채택된 답변은 취소할 수 없습니다. 정말로 채택하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCloseButton>취소하기</DialogCloseButton>
            <Button type="submit" variant={'secondary'} className="border-border" onClick={onAcceptButtonClick}>
              <CheckCircleIcon className={cn(QUESTION_STATUS_OPTIONS['SOLVED'].color)} /> 채택하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
