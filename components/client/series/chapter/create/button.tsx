'use client';

import { createSeriesChapter } from '@/apis/client/series';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
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
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SeriesChapterCreateButtonProps {
  seriesId: number;
}

export default function SeriesChapterCreateButton({ seriesId }: Readonly<SeriesChapterCreateButtonProps>) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  function onCreateButtonClick() {
    createSeriesChapter(seriesId)
      .then(({ message }) => {
        toast.success(message, { icon: <PlusIcon className="size-4" /> });
        queryClient.invalidateQueries({ queryKey: ['getSeriesForEdit', seriesId] }).then(() => setOpen(false));
      })
      .catch(handleError);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={'secondary'} size={'sm'} className="border-border" />}>
        <PlusIcon /> 챕터 추가
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>챕터를 생성하시겠습니까?</DialogTitle>
          <DialogDescription>
            마지막 챕터 뒤에 새로운 챕터가 생성됩니다. 챕터 생성 후에는 내용을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" onClick={onCreateButtonClick}>
            <PlusIcon /> 챕터 생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
