import { deleteArticle } from '@/apis/client/article';
import { handleError } from '@/lib/error';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { ButtonLink } from '@ui/button-link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogCloseButton,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@ui/dialog';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ArticleUnpublishedActionMenuProps {
  articleId: number;
}

export default function ArticleUnpublishedActionMenu({ articleId }: Readonly<ArticleUnpublishedActionMenuProps>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDeleteButtonClick() {
    startTransition(async () => {
      try {
        const { message } = await deleteArticle(articleId);
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/unpublished/articles');
      } catch (err) {
        handleError(err);
      }
    });
  }

  return (
    <ButtonGroup className="ml-auto">
      <ButtonLink href={`/edit/articles/${articleId}`} variant={'outline'} size={'sm'}>
        <PencilIcon /> 수정하기
      </ButtonLink>
      <Dialog>
        <DialogTrigger render={<Button variant={'outline'} size={'sm'} />}>
          <TrashIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>삭제된 아티클은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogCloseButton>취소하기</DialogCloseButton>
            <Button type="submit" variant="destructive" onClick={onDeleteButtonClick} disabled={isPending}>
              <TrashIcon /> 삭제하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ButtonGroup>
  );
}
