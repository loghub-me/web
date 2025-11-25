'use client';

import { deleteSeriesChapter } from '@/apis/client/series';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
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
import { useState } from 'react';
import { toast } from 'sonner';

interface SeriesChapterActionMenuProps {
  seriesId: number;
  chapterId: number;
}

export default function SeriesChapterActionMenu(props: Readonly<SeriesChapterActionMenuProps>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1">
        <SeriesChapterEditLink {...props} />
        <SeriesChapterDeleteButton {...props} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SeriesChapterEditLink({ seriesId, chapterId }: Readonly<SeriesChapterActionMenuProps>) {
  return (
    <ButtonLink href={`/edit/series/${seriesId}/chapters/${chapterId}`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function SeriesChapterDeleteButton({ seriesId, chapterId }: Readonly<SeriesChapterActionMenuProps>) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const queryKeys = [['getSeriesForEdit', seriesId], ['getSeriesChapterForEdit', seriesId, chapterId] as const];

  function onDeleteButtonClick() {
    deleteSeriesChapter(seriesId, chapterId)
      .then(async ({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
        setOpen(false);
      })
      .catch(handleError);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <TrashIcon className="mr-0.5" /> 삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 챕터는 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
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
