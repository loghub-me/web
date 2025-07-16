import { useQueryClient } from '@tanstack/react-query';
import { DotIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { removeSeriesReview } from '~/apis/client/series';
import StarIcon from '~/components/common/icon/star';
import { Button } from '~/components/ui/button';
import { UserInline } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { parseRelativeTime } from '~/lib/parse';

interface SeriesReviewListItemProps {
  seriesId: number;
  review: SeriesReview;
  queryKey: (string | number)[];
}

export default function SeriesReviewListItem({ seriesId, review, queryKey }: Readonly<SeriesReviewListItemProps>) {
  const { id: reviewId, writer, createdAt, content, rating } = review;
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onDeleteButtonClick() {
    removeSeriesReview(seriesId, reviewId)
      .then(({ message }) => {
        toast.success(message);
        return queryClient.invalidateQueries({ queryKey });
      })
      .catch(handleMessageError);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <UserInline username={writer.username} />
          <DotIcon className="text-muted-foreground" />
          <span className="text-muted-foreground text-xs">{parseRelativeTime(createdAt)}</span>
          <div className="pl-2 flex items-center">
            <StarIcon size={rating} fill={true} className="size-3" />
          </div>
        </div>
        {session && (
          <div className="flex gap-1">
            {session.username === writer.username && (
              <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onDeleteButtonClick}>
                <XIcon className="size-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="pl-7.5">
        <p className="leading-6 text-sm">{content}</p>
      </div>
    </div>
  );
}
