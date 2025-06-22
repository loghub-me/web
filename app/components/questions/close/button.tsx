import { XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { closeQuestion } from '~/apis/client/questions';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { handleMessageError } from '~/lib/error';

interface QuestionCloseButtonProps {
  id: number;
}

export default function QuestionCloseButton({ id }: Readonly<QuestionCloseButtonProps>) {
  const navigate = useNavigate();

  function onCloseButtonClick() {
    closeQuestion(id)
      .then(({ message, pathname }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch(handleMessageError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-none first:rounded-l-full last:rounded-r-full not-first:border-l-0"
          variant="outline"
        >
          <XIcon className="mr-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 질문을 닫겠습니까?</DialogTitle>
          <DialogDescription>닫힌 질문은 복구할 수 없습니다. 정말로 질문을 닫겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onCloseButtonClick}>
            <XIcon /> 닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
