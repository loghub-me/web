import type { Route } from './+types/detail';
import { useOutletContext } from 'react-router';
import BookReviews from '~/components/book/review';
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
      <BookReviews bookId={book.id} currentPage={reviewPage} />
    </main>
  );
}
