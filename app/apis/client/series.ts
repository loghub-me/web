import { clientAPI } from './instance';
import { z } from 'zod';
import type { seriesChapterEditSchema, seriesPostSchema, seriesReviewPostSchema } from '~/schemas/series';

export const postSeries = (json: z.infer<typeof seriesPostSchema>) =>
  clientAPI.post(`series`, { json }).json<RedirectResponseBody>();

export const editSeries = (seriesId: number, json: z.infer<typeof seriesPostSchema>) =>
  clientAPI.put(`series/${seriesId}`, { json }).json<RedirectResponseBody>();

export const removeSeries = (seriesId: number) => clientAPI.delete(`series/${seriesId}`).json<MessageResponseBody>();

export const addSeriesChapter = (seriesId: number) =>
  clientAPI.post(`series/${seriesId}/chapters`).json<RedirectResponseBody>();

export const editSeriesChapter = (
  seriesId: number,
  chapterSequence: number,
  json: z.infer<typeof seriesChapterEditSchema>
) => clientAPI.put(`series/${seriesId}/chapters/${chapterSequence}`, { json }).json<RedirectResponseBody>();

export const removeSeriesChapter = (seriesId: number, sequence: number) =>
  clientAPI.delete(`series/${seriesId}/chapters/${sequence}`).json<MessageResponseBody>();

export const changeSeriesChapterSequence = (seriesId: number, sequenceA: number, sequenceB: number) =>
  clientAPI.put(`series/${seriesId}/chapters/${sequenceA}/sequence/${sequenceB}`).json<MessageResponseBody>();

export const getSeriesReviews = (seriesId: number, page = 1) =>
  clientAPI.get(`series/${seriesId}/reviews`, { searchParams: { page } }).json<Page<SeriesReview>>();

export const postSeriesReview = (seriesId: number, json: z.infer<typeof seriesReviewPostSchema>) =>
  clientAPI.post(`series/${seriesId}/reviews`, { json }).json<MethodResponseBody>();

export const removeSeriesReview = (seriesId: number, reviewId: number) =>
  clientAPI.delete(`series/${seriesId}/reviews/${reviewId}`).json<MethodResponseBody>();

export const existsSeriesStar = (seriesId: number) =>
  clientAPI.get(`series/star/${seriesId}`).json<DataResponseBody<boolean>>();

export const addSeriesStar = (seriesId: number) => clientAPI.post(`series/star/${seriesId}`).json<MethodResponseBody>();

export const removeSeriesStar = (seriesId: number) =>
  clientAPI.delete(`series/star/${seriesId}`).json<MessageResponseBody>();
