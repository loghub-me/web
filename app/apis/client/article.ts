import { clientAPI } from './instance';
import { z } from 'zod';
import { type articleCommentPostSchema, articleEditSchema, articlePostSchema } from '~/schemas/article';

export const postArticle = (json: z.infer<typeof articlePostSchema>) =>
  clientAPI.post(`articles`, { json }).json<RedirectResponseBody>();

export const editArticle = (articleId: number, json: z.infer<typeof articleEditSchema>) =>
  clientAPI.put(`articles/${articleId}`, { json }).json<RedirectResponseBody>();

export const removeArticle = (articleId: number) =>
  clientAPI.delete(`articles/${articleId}`).json<MessageResponseBody>();

export const getArticleComments = (articleId: number, page = 1) =>
  clientAPI.get(`articles/${articleId}/comments`, { searchParams: { page } }).json<Page<ArticleComment>>();

export const getArticleCommentReplies = (articleId: number, commentId: number) =>
  clientAPI.get(`articles/${articleId}/comments/${commentId}/replies`).json<ArticleComment[]>();

export const postArticleComment = (
  articleId: number,
  json: z.infer<typeof articleCommentPostSchema>,
  parentId?: number
) => clientAPI.post(`articles/${articleId}/comments`, { json: { ...json, parentId } }).json<MethodResponseBody>();

export const removeArticleComment = (articleId: number, commentId: number) =>
  clientAPI.delete(`articles/${articleId}/comments/${commentId}`).json<MethodResponseBody>();

export const existsArticleStar = (articleId: number) =>
  clientAPI.get(`articles/star/${articleId}`).json<DataResponseBody<boolean>>();

export const addArticleStar = (articleId: number) =>
  clientAPI.post(`articles/star/${articleId}`).json<MethodResponseBody>();

export const removeArticleStar = (articleId: number) =>
  clientAPI.delete(`articles/star/${articleId}`).json<MessageResponseBody>();
