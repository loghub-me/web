'use client';

import { deleteArticle } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { Button, ButtonLink } from '@ui/button';
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
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ArticleActionMenuProps {
  article: Pick<ArticleDetail, 'id' | 'writer'>;
}

export default function ArticleActionMenu({ article }: Readonly<ArticleActionMenuProps>) {
  const { writer } = article;
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
          <ArticleEditLink articleId={article.id} />
          <ArticleDeleteButton articleId={article.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function ArticleEditLink({ articleId }: Readonly<{ articleId: number }>) {
  return (
    <ButtonLink href={`/edit/articles/${articleId}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function ArticleDeleteButton({ articleId }: Readonly<{ articleId: number }>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteArticle(articleId)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/search/articles');
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
          <DialogDescription>삭제된 아티클은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
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
