import { pageZod as page, queryZod as query, sortZod as sort } from './zod';
import { z } from 'zod';

export const questionsSearchSchema = z.object({
  query,
  sort,
  page,
  filter: z.enum(['all', 'open', 'closed', 'solved']).default('all'),
});

export const questionPostSchema = z.object({
  title: z.string().min(1).max(128),
  content: z.string().min(10).max(2048),
  topicSlugs: z.array(z.string()),
});
export const answerPostSchema = z.object({ content: z.string().min(10).max(2048) });
