'use client';

import { deleteSeriesChapter } from '@/apis/client/series';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
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
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

interface SeriesChapterActionMenuProps {
  seriesId: number;
  chapterId: number;
}

export default function SeriesChapterActionMenu({ seriesId, chapterId }: Readonly<SeriesChapterActionMenuProps>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger render={<Button variant={'ghost'} size={'icon'} className="rounded-full" />}>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-fit min-w-auto">
        <SeriesChapterEditLink seriesId={seriesId} chapterId={chapterId} />
        <SeriesChapterDeleteButton seriesId={seriesId} chapterId={chapterId} />
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
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const queryKeys = [
    ['getSeriesForEdit', seriesId],
    ['getSeriesChapterForEdit', seriesId, chapterId],
  ] as const;

  function onDeleteButtonClick() {
    startTransition(async () => {
      try {
        const { message } = await deleteSeriesChapter(seriesId, chapterId);
        toast.success(message, { icon: <TrashIcon className="size-4" /> });

        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
        setOpen(false);
      } catch (err) {
        handleError(err);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={'ghost'} size={'sm'} />}>
        <TrashIcon className="mr-0.5" /> 삭제하기
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 챕터는 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" variant="destructive" onClick={onDeleteButtonClick} disabled={isPending}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
