import { z } from 'zod';
import zodFields from '~/schemas/fields';

const { content, id, page, query, sort, thumbnail, title, topicSlugs } = zodFields;

const articleSearchSchema = z.object({ query, sort, page });
const articlePostSchema = z.object({ title, content, thumbnail, topicSlugs });
const articleEditSchema = z.object({ title, content, thumbnail, topicSlugs });
const articleCommentPageSchema = z.object({ commentPage: page });
const articleCommentPostSchema = z.object({
  content: z
    .string({ message: '댓글 내용은 문자열이어야 합니다.' })
    .trim()
    .min(1, { message: '댓글을 입력해주세요.' })
    .max(255, { message: '댓글은 최대 255자까지 입력할 수 있습니다.' }),
  articleId: id,
  parentId: id.optional(),
});

export {
  articleSearchSchema,
  articlePostSchema,
  articleEditSchema,
  articleCommentPageSchema,
  articleCommentPostSchema,
};
