import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { articleSearchSchema } from '~/schemas/article';
import type { bookSearchSchema } from '~/schemas/book';
import type { questionSearchSchema } from '~/schemas/question';

export const getUser = (username: string) => serverAPI.get(`users/@${username}`).json<UserDetail>();

export const searchUserArticles = (username: string, searchParams: z.infer<typeof articleSearchSchema>) =>
  serverAPI.get(`users/@${username}/articles`, { searchParams }).json<Page<Article>>();

export const searchUserBooks = (username: string, searchParams: z.infer<typeof bookSearchSchema>) =>
  serverAPI.get(`users/@${username}/books`, { searchParams }).json<Page<Book>>();

export const searchUserQuestions = (username: string, searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get(`users/@${username}/questions`, { searchParams }).json<Page<Question>>();

export const getUserStars = (username: string, page = 1) =>
  serverAPI.get(`users/@${username}/stars`, { searchParams: { page } }).json<Page<Star>>();
