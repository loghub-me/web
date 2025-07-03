import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { articleSearchSchema } from '~/schemas/article';

export const searchArticles = (searchParams: z.infer<typeof articleSearchSchema>) =>
  serverAPI.get('articles', { searchParams }).json<Page<Article>>();

export const getArticle = (username: string, slug: string) =>
  serverAPI.get(`articles/@${username}/${slug}`).json<ArticleDetail>();
