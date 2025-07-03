import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getBook, getBookChapter } from '~/apis/server/books';
import { BookChapterEditDialog, BookChapterEditForm } from '~/components/book';
import { EasyMDEEditor } from '~/components/common/easymde';
import AuthGuard from '~/guards/auth-guard';
import { parseParams } from '~/lib/parse';
import { bookChapterEditSchema } from '~/schemas/book';
import { compositeKeySchema } from '~/schemas/common';
import { sequenceZod } from '~/schemas/zod';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug, sequence } = parseParams(params, compositeKeySchema.extend({ sequence: sequenceZod }));
  const book = await getBook(username, slug);
  const chapter = await getBookChapter(book.id, sequence);
  return { book, chapter };
}

export default function BookChapterEditRoute({ loaderData }: Route.ComponentProps) {
  const { book, chapter } = loaderData;
  const { title, content, sequence } = chapter;

  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof bookChapterEditSchema>>({
    resolver: zodResolver(bookChapterEditSchema),
    defaultValues: { title, content: content.markdown },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <AuthGuard>
      <main className="max-h-screen h-screen pt-16">
        <EasyMDEEditor title="챕터 수정" ref={easyMDERef} defaultValue={content.markdown}>
          <BookChapterEditDialog onOpenChange={onDialogOpenChange}>
            <BookChapterEditForm form={form} bookId={book.id} chapterSequence={sequence} />
          </BookChapterEditDialog>
        </EasyMDEEditor>
      </main>
    </AuthGuard>
  );
}
