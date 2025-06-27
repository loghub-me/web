import {
  commentContentZod as commentContent,
  idZod as id,
  pageZod as page,
  queryZod as query,
  sortZod as sort,
} from './zod';
import { z } from 'zod';

export const articlesSearchSchema = z.object({ query, sort, page });

export const articlePostSchema = z.object({
  title: z.string().min(1).max(128),
  content: z.string().min(10).max(2048),
  thumbnail: z.string(),
  topicSlugs: z.array(z.string()),
});
export const articleEditSchema = articlePostSchema;

export const articleCommentPostSchema = z.object({
  content: commentContent,
  articleId: id,
  parentId: id.optional(),
});
