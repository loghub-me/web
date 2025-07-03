import { commentContentZod, idZod, pageZod, queryZod, sortZod } from './zod';
import { z } from 'zod';

export const articleSearchSchema = z.object({ query: queryZod, sort: sortZod, page: pageZod });

export const articlePostSchema = z.object({
  title: z.string().min(1).max(128),
  content: z.string().min(10).max(2048),
  thumbnail: z.string(),
  topicSlugs: z.array(z.string()),
});
export const articleEditSchema = articlePostSchema;

export const articleCommentPageSchema = z.object({ commentPage: pageZod });

export const articleCommentPostSchema = z.object({
  content: commentContentZod,
  articleId: idZod,
  parentId: idZod.optional(),
});
