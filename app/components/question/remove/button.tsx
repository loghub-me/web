import { TrashIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { removeQuestion } from '~/apis/client/question';
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

interface QuestionRemoveButtonProps {
  id: number;
}

export default function QuestionRemoveButton({ id }: Readonly<QuestionRemoveButtonProps>) {
  const navigate = useNavigate();

  function onRemoveButtonClick() {
    removeQuestion(id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        navigate('/search/questions');
      })
      .catch(handleMessageError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'multi'}>
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 질문은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onRemoveButtonClick}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
