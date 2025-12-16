'use client';

import { deleteSeries } from '@/apis/client/series';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
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
import { EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SeriesActionMenuProps {
  series: Pick<SeriesDetail, 'id' | 'writer'>;
}

export default function SeriesActionMenu({ series }: Readonly<SeriesActionMenuProps>) {
  const { writer } = series;
  const { session } = useAuth();

  return (
    session?.id === writer.id && (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button variant={'ghost'} size={'icon'} className="rounded-full" />}>
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1 w-fit min-w-auto">
          <SeriesEditLink seriesId={series.id} />
          <SeriesDeleteButton seriesId={series.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function SeriesEditLink({ seriesId }: Readonly<{ seriesId: number }>) {
  return (
    <ButtonLink href={`/edit/series/${seriesId}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function SeriesDeleteButton({ seriesId }: Readonly<{ seriesId: number }>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteSeries(seriesId)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/search/series');
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
          <DialogDescription>삭제된 시리즈는 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
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
