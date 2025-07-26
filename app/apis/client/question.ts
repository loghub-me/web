import { clientAPI } from './instance';
import { z } from 'zod';
import type { answerPostSchema, questionPostSchema } from '~/schemas/question';

export const postQuestion = (json: z.infer<typeof questionPostSchema>) =>
  clientAPI.post(`questions`, { json }).json<RedirectResponseBody>();

export const editQuestion = (questionId: number, json: z.infer<typeof questionPostSchema>) =>
  clientAPI.put(`questions/${questionId}`, { json }).json<RedirectResponseBody>();

export const removeQuestion = (questionId: number) =>
  clientAPI.delete(`questions/${questionId}`).json<MessageResponseBody>();

export const closeQuestion = (questionId: number) =>
  clientAPI.post(`questions/${questionId}/close`).json<RedirectResponseBody>();

export const existsQuestionStar = (questionId: number) =>
  clientAPI.get(`questions/star/${questionId}`).json<DataResponseBody<boolean>>();

export const addQuestionStar = (questionId: number) =>
  clientAPI.post(`questions/star/${questionId}`).json<MethodResponseBody>();

export const removeQuestionStar = (questionId: number) =>
  clientAPI.delete(`questions/star/${questionId}`).json<MessageResponseBody>();

export const postAnswer = (questionId: number, json: z.infer<typeof answerPostSchema>) =>
  clientAPI.post(`questions/${questionId}/answers`, { json }).json<RedirectResponseBody>();

export const editAnswer = (questionId: number, answerId: number, json: z.infer<typeof answerPostSchema>) =>
  clientAPI.put(`questions/${questionId}/answers/${answerId}`, { json }).json<RedirectResponseBody>();

export const removeAnswer = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}`).json<MessageResponseBody>();

export const acceptAnswer = (questionId: number, answerId: number) =>
  clientAPI.post(`questions/${questionId}/answers/${answerId}/accept`).json<MethodResponseBody>();

export const requestGenerateAnswer = (questionId: number) =>
  clientAPI.post(`questions/${questionId}/answers/generate`).json<MessageResponseBody>();
