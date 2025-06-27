import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { articlesSearchSchema } from '~/schemas/articles';
import type { questionsSearchSchema } from '~/schemas/questions';
import type { pageSchema } from '~/schemas/zod';

export const getUser = (username: string) => serverAPI.get(`users/@${username}`).json<UserDetail>();

export const searchUserArticles = (username: string, searchParams: z.infer<typeof articlesSearchSchema>) =>
  serverAPI.get(`users/@${username}/articles`, { searchParams }).json<Page<Article>>();

export const searchUserQuestions = (username: string, searchParams: z.infer<typeof questionsSearchSchema>) =>
  serverAPI.get(`users/@${username}/questions`, { searchParams }).json<Page<Question>>();

export const getUserStars = (username: string, searchParams: z.infer<typeof pageSchema>) =>
  serverAPI.get(`users/@${username}/stars`, { searchParams }).json<Page<Star>>();
