import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { getBookReviews } from '~/apis/client/books';
import BookReviewForm from '~/components/book/review/form';
import BookReviewList from '~/components/book/review/list';
import BookReviewListItem from '~/components/book/review/list-item';
import { CommentSkeleton as ReviewSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';

interface BookReviewsProps {
  bookId: number;
  currentPage?: number;
}

export default function BookReviews({ bookId, currentPage = 1 }: Readonly<BookReviewsProps>) {
  const { data: reviews, status } = useQuery({
    queryKey: ['books-review', bookId, currentPage],
    queryFn: () => getBookReviews(bookId, currentPage),
  });
  const { pathname } = useLocation();

  return (
    <div>
      <div className="p-6 border-b">
        <BookReviewForm bookId={bookId} />
      </div>
      <div className="p-6 space-y-2">
        <BookReviewList>
          {status === 'pending' && <ReviewSkeleton size={2} />}
          {reviews?.page.totalPages === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
            </p>
          )}
          {reviews?.content.map((review) => <BookReviewListItem key={review.id} bookId={bookId} review={review} />)}
        </BookReviewList>
        {reviews && (
          <PageNav to={`${pathname}?reviewPage=`} currentPage={currentPage} totalPages={reviews?.page.totalPages} />
        )}
      </div>
    </div>
  );
}
