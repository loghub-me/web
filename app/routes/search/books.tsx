import type { Route } from './+types/books';
import { Suspense, useRef } from 'react';
import { Await, Form } from 'react-router';
import { searchBooks } from '~/apis/server/books';
import { BookList, BookListItem, BookListSkeleton } from '~/components/book';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { SearchQuery, SearchSort, SearchSubmit } from '~/components/search';
import PageNav from '~/components/search/page-nav';
import { BOOK_SORT_OPTIONS } from '~/constants/sorts';
import { parseSearchParams } from '~/lib/parse';
import { bookSearchSchema } from '~/schemas/book';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, bookSearchSchema);
  const books = searchBooks(searchParams);

  return { books, url, searchParams };
}

export default function SearchBooksRoute({ loaderData }: Route.ComponentProps) {
  const {
    books,
    url: { pathname },
    searchParams: { query, sort, page },
  } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <Form action={pathname} ref={formRef} className="flex gap-2">
        <SearchSort
          submit={() => formRef.current?.requestSubmit()}
          currentSort={sort}
          sortOptions={BOOK_SORT_OPTIONS}
        />
        <SearchQuery />
        <SearchSubmit />
      </Form>
      <BookList>
        <Suspense fallback={<BookListSkeleton size={4} />}>
          <Await resolve={books}>
            {(resolved) => {
              if (resolved.content.length === 0) {
                return <ListEmpty className="col-span-4" message="검색된 도서가 없습니다." />;
              }
              return resolved.content.map((book) => <BookListItem key={book.id} book={book} />);
            }}
          </Await>
        </Suspense>
      </BookList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={books}>
          {(resolved) => (
            <PageNav
              to={`${pathname}?query=${query}&sort=${sort}&page=`}
              currentPage={page}
              totalPages={resolved.page.totalPages}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
