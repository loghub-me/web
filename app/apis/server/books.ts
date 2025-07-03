import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { bookSearchSchema } from '~/schemas/book';

export const searchBooks = (searchParams: z.infer<typeof bookSearchSchema>) =>
  serverAPI.get('books', { searchParams }).json<Page<Book>>();

export const getBook = (username: string, slug: string) =>
  serverAPI.get(`books/@${username}/${slug}`).json<BookDetail>();

export const getBookChapter = (bookId: number, sequence: number) =>
  serverAPI.get(`books/${bookId}/chapters/${sequence}`).json<BookChapterDetail>();
