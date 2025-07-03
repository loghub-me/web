import { useQueryClient } from '@tanstack/react-query';
import { DotIcon, StarIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { removeBookReview } from '~/apis/client/books';
import { Button } from '~/components/ui/button';
import { UserInline } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { parseRelativeTime } from '~/lib/parse';

interface BookReviewListItemProps {
  bookId: number;
  review: BookReview;
}

export default function BookReviewListItem({ bookId, review }: Readonly<BookReviewListItemProps>) {
  const { id: reviewId, writer, createdAt, content, rating } = review;
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onDeleteButtonClick() {
    removeBookReview(bookId, reviewId)
      .then(({ message }) => {
        toast.success(message);
        return queryClient.invalidateQueries({ queryKey: ['books-review', bookId] });
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
            {Array.from({ length: rating }, (_, index) => (
              <StarIcon key={index} className="size-3 text-yellow-500 fill-current" />
            ))}
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
