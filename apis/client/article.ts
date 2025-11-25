'use client';

import { clientAPI } from '@/apis/client/instance';
import {
  articleCommentEditSchema,
  articleCommentPostSchema,
  articleEditSchema,
  articlePostSchema,
} from '@/schemas/article';
import { z } from 'zod';

const getArticleForEdit = async (articleId: number) =>
  clientAPI.get(`articles/${articleId}/for-edit`).json<ArticleForEdit>();

const postArticle = (json: z.infer<typeof articlePostSchema>) =>
  clientAPI.post(`articles`, { json }).json<RedirectResponseBody>();

const editArticle = (articleId: number, json: z.infer<typeof articleEditSchema>) =>
  clientAPI.put(`articles/${articleId}`, { json }).json<RedirectResponseBody>();

const deleteArticle = (articleId: number) => clientAPI.delete(`articles/${articleId}`).json<MessageResponseBody>();

const updateArticleDraft = (articleId: number, content: string) =>
  clientAPI.patch(`articles/${articleId}/draft`, { json: { content } }).json<MessageResponseBody>();

const deleteArticleDraft = (articleId: number) =>
  clientAPI.delete(`articles/${articleId}/draft`).json<MessageResponseBody>();

const getArticleComments = (articleId: number, page = 1) =>
  clientAPI.get(`articles/${articleId}/comments`, { searchParams: { page } }).json<Page<ArticleComment>>();

const getArticleCommentReplies = (articleId: number, commentId: number) =>
  clientAPI.get(`articles/${articleId}/comments/${commentId}/replies`).json<ArticleComment[]>();

const postArticleComment = (articleId: number, json: z.infer<typeof articleCommentPostSchema>, parentId?: number) =>
  clientAPI.post(`articles/${articleId}/comments`, { json: { ...json, parentId } }).json<MethodResponseBody>();

const editArticleComment = (articleId: number, commentId: number, json: z.infer<typeof articleCommentEditSchema>) =>
  clientAPI.put(`articles/${articleId}/comments/${commentId}`, { json }).json<MethodResponseBody>();

const deleteArticleComment = (articleId: number, commentId: number) =>
  clientAPI.delete(`articles/${articleId}/comments/${commentId}`).json<MethodResponseBody>();

const existsArticleStar = (articleId: number) =>
  clientAPI.get(`articles/star/${articleId}`).json<DataResponseBody<boolean>>();

const addArticleStar = (articleId: number) => clientAPI.post(`articles/star/${articleId}`).json<MethodResponseBody>();

const removeArticleStar = (articleId: number) =>
  clientAPI.delete(`articles/star/${articleId}`).json<MessageResponseBody>();

export { getArticleForEdit, postArticle, editArticle, deleteArticle };
export { updateArticleDraft, deleteArticleDraft };
export { getArticleComments, getArticleCommentReplies, postArticleComment, editArticleComment, deleteArticleComment };
export { existsArticleStar, addArticleStar, removeArticleStar };
