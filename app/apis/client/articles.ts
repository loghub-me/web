import { clientAPI } from './instance';
import { z } from 'zod';
import type { articleCommentPostSchema } from '~/schemas/articles';

export const getArticleComments = (articleId: number, page = 1) =>
  clientAPI.get(`articles/${articleId}/comments`, { searchParams: { page } }).json<Page<ArticleComment>>();

export const getArticleCommentReplies = (articleId: number, commentId: number) =>
  clientAPI.get(`articles/${articleId}/comments/${commentId}/replies`).json<ArticleComment[]>();

export const postArticleComment = (articleId: number, json: z.infer<typeof articleCommentPostSchema>) =>
  clientAPI.post(`articles/${articleId}/comments`, { json }).json<MethodResponseBody>();

export const postArticleCommentReply = (
  articleId: number,
  parentId: number,
  json: z.infer<typeof articleCommentPostSchema>
) => postArticleComment(articleId, { ...json, parentId });

export const deleteArticleComment = (articleId: number, commentId: number) =>
  clientAPI.delete(`articles/${articleId}/comments/${commentId}`).json<MethodResponseBody>();
