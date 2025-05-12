import {
  commentContentZod as commentContent,
  compositeKeySchema,
  idZod as id,
  pageZod as page,
  queryZod as query,
  sortZod as sort,
} from './zod';
import { z } from 'zod';

export const articlesSearchSchema = z.object({ query, sort, page });

export const articleDetailSchema = compositeKeySchema;

export const articleCommentPostSchema = z.object({
  content: commentContent,
  articleId: id,
  parentId: id.optional(),
});
