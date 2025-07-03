import { data, useOutletContext } from 'react-router';
import { BookChapterDetailContent } from '~/components/book';
import { Card } from '~/components/ui/card';
import { ErrorMessage } from '~/constants/error-messages';
import type { BookDetailLayoutContextProps } from '~/routes/users/books/layout';

export default function BookChapterDetailRoute() {
  const { book, chapter } = useOutletContext<BookDetailLayoutContextProps>();

  if (!chapter) {
    throw data(ErrorMessage.UNKNOWN, { status: 404 });
  }

  return (
    <main className="p-4 w-full">
      <Card className="h-fit pt-0">
        <BookChapterDetailContent
          {...chapter}
          bookSlug={book.slug}
          writerUsername={book.writer.username}
          currentSequence={chapter.sequence}
          totalChapters={book.chapters.length}
        />
      </Card>
    </main>
  );
}
