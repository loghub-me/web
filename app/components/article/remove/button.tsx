import { TrashIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { removeArticle } from '~/apis/client/article';
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

interface ArticleRemoveButtonProps {
  id: number;
}

export default function ArticleRemoveButton({ id }: Readonly<ArticleRemoveButtonProps>) {
  const navigate = useNavigate();

  function onRemoveButtonClick() {
    removeArticle(id)
      .then(({ message }) => {
        toast.success(message);
        navigate('/search/articles');
      })
      .catch(handleMessageError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-r-full" variant="outline">
          <TrashIcon className="mr-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 아티클은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
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
