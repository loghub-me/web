'use client';

import { createSeriesChapter } from '@/apis/client/series';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { PlusIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface SeriesChapterCreateButtonProps {
  seriesId: number;
}

export default function SeriesChapterCreateButton({ seriesId }: Readonly<SeriesChapterCreateButtonProps>) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  function onCreateButtonClick() {
    startTransition(async () => {
      try {
        const { message } = await createSeriesChapter(seriesId);
        toast.success(message, { icon: <PlusIcon className="size-4" /> });

        await queryClient.invalidateQueries({ queryKey: ['getSeriesForEdit', seriesId] });
      } catch (err) {
        handleError(err);
      }
    });
  }

  return (
    <Button type={'button'} size={'sm'} onClick={onCreateButtonClick} disabled={isPending}>
      <PlusIcon /> 챕터 생성
    </Button>
  );
}
