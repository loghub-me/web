import { BotIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { requestGenerateAnswer } from '~/apis/client/question';
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

interface QuestionAnswerGenerateRequestButtonProps {
  id: number;
}

export default function QuestionAnswerGenerateRequestButton({
  id,
}: Readonly<QuestionAnswerGenerateRequestButtonProps>) {
  const navigate = useNavigate();

  function onRequestButtonClick() {
    requestGenerateAnswer(id)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch(handleMessageError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'multi'}>
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>답변 생성 요청</DialogTitle>
          <DialogDescription>답변 생성은 10분에 한 번만 요청할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" onClick={onRequestButtonClick}>
            <BotIcon /> 요청하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
