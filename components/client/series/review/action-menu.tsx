'use client';

import { deleteSeriesReview } from '@/apis/client/series';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DeleteIcon, PencilIcon } from 'lucide-react';
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

  async function onClickDelete() {
    try {
      const { message } = await deleteSeriesReview(seriesId, review.id);
      toast.success(message);

      await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
    } catch (err) {
      handleError(err);
    }
  }

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {session?.id === review.writer.id && (
          <>
            <Button
              type={'button'}
              variant={editing ? 'secondary' : 'ghost'}
              size={'icon'}
              className="size-6 rounded-full"
              onClick={onClickEdit}
            >
              <PencilIcon className="size-3 text-muted-foreground" />
            </Button>
            {!editing && (
              <Button
                type={'button'}
                variant={'ghost'}
                size={'icon'}
                className="size-6 rounded-full"
                onClick={onClickDelete}
              >
                <DeleteIcon className="size-3 text-muted-foreground" />
              </Button>
            )}
          </>
        )}
      </div>
    )
  );
}
