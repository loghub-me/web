import { SeriesReviewActionMenu, SeriesReviewEditForm } from '@/components/client/series';
import { UserLink } from '@/components/client/user';
import StarIcon from '@ui/star-icon';
import { RelativeTimestamp } from '@ui/timestamp';
import { DotIcon } from 'lucide-react';
import { useState } from 'react';

interface SeriesReviewListItemProps {
  seriesId: number;
  review: SeriesReview;
  reviewsQueryKey: (string | number)[];
}

export default function SeriesReviewListItem({
  seriesId,
  review,
  reviewsQueryKey,
}: Readonly<SeriesReviewListItemProps>) {
  const { writer, content, rating } = review;
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground -ml-1" />
        <RelativeTimestamp {...review} />
        <div className="pl-2.5 flex items-center gap-0.5">
          <StarIcon size={rating} fill={true} className="size-3" />
        </div>
        <SeriesReviewActionMenu
          seriesId={seriesId}
          review={review}
          queryKeys={[reviewsQueryKey]}
          editing={editing}
          setEditing={setEditing}
        />
      </div>
      <div className="pl-9 space-y-1">
        {editing ? (
          <SeriesReviewEditForm
            seriesId={seriesId}
            review={review}
            queryKey={reviewsQueryKey}
            closeForm={() => setEditing(false)}
          />
        ) : (
          <p className="leading-6 text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
}
