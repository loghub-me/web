'use client';

import { deleteSeriesReview } from '@/apis/client/series';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { PencilIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface SeriesReviewActionMenuProps {
  seriesId: number;
  review: Pick<SeriesReview, 'id' | 'writer'>;
  queryKeys: (string | number)[][];
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SeriesReviewActionMenu({
  seriesId,
  review,
  queryKeys,
  editing,
  setEditing,
}: Readonly<SeriesReviewActionMenuProps>) {
  const { status, session } = useAuth();
  const queryClient = useQueryClient();

  function onClickEdit() {
    setEditing((prev) => !prev);
  }

  function onClickDelete() {
    deleteSeriesReview(seriesId, review.id)
      .then(async ({ message }) => {
        toast.success(message);
        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
      })
      .catch(handleError);
  }

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {session?.id === review.writer.id && (
          <>
            <Button
              variant={editing ? 'secondary' : 'ghost'}
              size={'icon'}
              className="size-6 rounded-full"
              onClick={onClickEdit}
            >
              <PencilIcon className="size-3 text-muted-foreground" />
            </Button>
            <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onClickDelete}>
              <XIcon className="size-3 text-muted-foreground" />
            </Button>
          </>
        )}
      </div>
    )
  );
}
