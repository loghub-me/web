import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { articleSearchSchema } from '~/schemas/article';
import type { questionSearchSchema } from '~/schemas/question';
import type { seriesSearchSchema } from '~/schemas/series';

export const getUser = (username: string) => serverAPI.get(`users/@${username}`).json<UserDetail>();

export const searchUserArticles = (username: string, searchParams: z.infer<typeof articleSearchSchema>) =>
  serverAPI.get(`users/@${username}/articles`, { searchParams }).json<Page<Article>>();

export const searchUserSeries = (username: string, searchParams: z.infer<typeof seriesSearchSchema>) =>
  serverAPI.get(`users/@${username}/series`, { searchParams }).json<Page<Series>>();

export const searchUserQuestions = (username: string, searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get(`users/@${username}/questions`, { searchParams }).json<Page<Question>>();

export const getUserStars = (username: string, page = 1) =>
  serverAPI.get(`users/@${username}/stars`, { searchParams: { page } }).json<Page<Star>>();
