import { clientAPI } from './instance';
import { z } from 'zod';
import type { articleCommentPostSchema } from '~/schemas/articles';

export const getComments = (articleId: number, page = 1) =>
  clientAPI.get(`articles/${articleId}/comments`, { searchParams: { page } }).json<Page<ArticleComment>>();

export const getCommentReplies = (articleId: number, commentId: number) =>
  clientAPI.get(`articles/${articleId}/comments/${commentId}/replies`).json<ArticleComment[]>();

export const postComment = (articleId: number, json: z.infer<typeof articleCommentPostSchema>) =>
  clientAPI.post(`articles/${articleId}/comments`, { json }).json<MethodResponseBody>();

export const deleteComment = (articleId: number, commentId: number) =>
  clientAPI.delete(`articles/${articleId}/comments/${commentId}`).json<MethodResponseBody>();
