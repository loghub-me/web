import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { getBook, getBookChapter } from '~/apis/server/books';
import {
  BookChapterList,
  BookChapterListItem,
  BookDetailAside,
  BookDetailContent,
  BookDetailHeader,
} from '~/components/book';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { sequenceZod } from '~/schemas/zod';

export type BookDetailLayoutContextProps = { book: BookDetail; chapter?: BookChapterDetail };

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug, sequence } = parseParams(
    params,
    compositeKeySchema.extend({ sequence: sequenceZod.optional() })
  );
  const book = await getBook(username, slug);

  if (sequence) {
    const chapter = await getBookChapter(book.id, sequence);
    return { book, chapter };
  }
  return { book };
}

export default function BookDetailLayout({ loaderData }: Route.ComponentProps) {
  const { book, chapter } = loaderData;
  const currentSequence = chapter?.sequence;

  return (
    <div className="pt-16 min-h-screen flex flex-col md:flex-row">
      <BookDetailAside>
        <BookDetailHeader {...book} />
        <BookDetailContent {...book} />
        <BookChapterList>
          {book.chapters.map((chapter) => (
            <BookChapterListItem key={chapter.sequence} {...book} chapter={chapter} currentSequence={currentSequence} />
          ))}
        </BookChapterList>
      </BookDetailAside>
      <Outlet context={{ book, chapter } satisfies BookDetailLayoutContextProps} />
    </div>
  );
}
