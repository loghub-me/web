import { clientAPI } from './instance';
import { z } from 'zod';
import { bookChapterEditSchema, bookEditSchema, bookPostSchema, type bookReviewPostSchema } from '~/schemas/book';

export const postBook = (json: z.infer<typeof bookPostSchema>) =>
  clientAPI.post(`books`, { json }).json<RedirectResponseBody>();

export const editBook = (bookId: number, json: z.infer<typeof bookEditSchema>) =>
  clientAPI.put(`books/${bookId}`, { json }).json<RedirectResponseBody>();

export const removeBook = (bookId: number) => clientAPI.delete(`books/${bookId}`).json<MessageResponseBody>();

export const editBookChapter = (bookId: number, chapterSequence: number, json: z.infer<typeof bookChapterEditSchema>) =>
  clientAPI.put(`books/${bookId}/chapters/${chapterSequence}`, { json }).json<RedirectResponseBody>();

export const removeBookChapter = (bookId: number, sequence: number) =>
  clientAPI.delete(`books/${bookId}/chapters/${sequence}`).json<MessageResponseBody>();

export const getBookReviews = (bookId: number, page = 1) =>
  clientAPI.get(`books/${bookId}/reviews`, { searchParams: { page } }).json<Page<BookReview>>();

export const postBookReview = (bookId: number, json: z.infer<typeof bookReviewPostSchema>) =>
  clientAPI.post(`books/${bookId}/reviews`, { json }).json<MethodResponseBody>();

export const removeBookReview = (bookId: number, reviewId: number) =>
  clientAPI.delete(`books/${bookId}/reviews/${reviewId}`).json<MethodResponseBody>();

export const existsBookStar = (bookId: number) =>
  clientAPI.get(`books/star/${bookId}`).json<DataResponseBody<boolean>>();

export const addBookStar = (bookId: number) => clientAPI.post(`books/star/${bookId}`).json<MethodResponseBody>();

export const removeBookStar = (bookId: number) => clientAPI.delete(`books/star/${bookId}`).json<MessageResponseBody>();
