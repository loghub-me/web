import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { seriesSearchSchema } from '~/schemas/series';

export const searchSeries = (searchParams: z.infer<typeof seriesSearchSchema>) =>
  serverAPI.get('series', { searchParams }).json<Page<Series>>();

export const getSeries = (username: string, slug: string) =>
  serverAPI.get(`series/@${username}/${slug}`).json<SeriesDetail>();

export const getSeriesChapter = (seriesId: number, sequence: number) =>
  serverAPI.get(`series/${seriesId}/chapters/${sequence}`).json<SeriesChapterDetail>();
