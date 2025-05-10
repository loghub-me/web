import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { articlesSearchSchema } from '~/schemas/articles';

export const searchArticles = (searchParams: z.infer<typeof articlesSearchSchema>) =>
  serverAPI.get('articles', { searchParams }).json<Page<Article>>();
