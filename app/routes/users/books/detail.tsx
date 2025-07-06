import type { Route } from './+types/detail';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useOutletContext } from 'react-router';
import { getBookReviews } from '~/apis/client/books';
import { BookReviewForm, BookReviewList, BookReviewListItem } from '~/components/book';
import { CommentSkeleton as ReviewSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { parseSearchParams } from '~/lib/parse';
import type { BookDetailLayoutContextProps } from '~/routes/users/books/layout';
import { bookReviewPageSchema } from '~/schemas/book';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { reviewPage } = parseSearchParams(url.searchParams, bookReviewPageSchema);
  return { reviewPage };
}

export default function BookDetailRoute({ loaderData }: Route.ComponentProps) {
  const { reviewPage } = loaderData;
  const { book } = useOutletContext<BookDetailLayoutContextProps>();

  return (
    <main className="p-4 w-full">
      <BookDetailComments bookId={book.id} currentPage={reviewPage} />
    </main>
  );
}

interface BookDetailCommentsProps {
  bookId: number;
  currentPage: number;
}

function BookDetailComments({ bookId, currentPage }: Readonly<BookDetailCommentsProps>) {
  const queryKey = ['getBookReviews', bookId, currentPage];
  const { data: reviews, status } = useQuery({ queryKey, queryFn: () => getBookReviews(bookId, currentPage) });
  const { pathname } = useLocation();

  return (
    <div>
      <div className="p-6 border-b">
        <BookReviewForm bookId={bookId} queryKey={queryKey} />
      </div>
      <div className="p-6 space-y-2">
        <BookReviewList>
          {status === 'pending' && <ReviewSkeleton size={2} />}
          {reviews?.page.totalPages === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
            </p>
          )}
          {reviews?.content.map((review) => (
            <BookReviewListItem key={review.id} bookId={bookId} review={review} queryKey={queryKey} />
          ))}
        </BookReviewList>
        {reviews && (
          <PageNav to={`${pathname}?reviewPage=`} currentPage={currentPage} totalPages={reviews?.page.totalPages} />
        )}
      </div>
    </div>
  );
}
