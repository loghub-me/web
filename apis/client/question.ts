'use client';

import { clientAPI } from '@/apis/client/instance';
import {
  questionAnswerGenerateRequestSchema,
  questionAnswerPostSchema,
  questionEditSchema,
  questionPostSchema,
} from '@/schemas/question';
import { z } from 'zod';

const getQuestionForEdit = async (questionId: number) =>
  clientAPI.get(`questions/${questionId}/for-edit`).json<QuestionForEdit>();

const postQuestion = (json: z.infer<typeof questionPostSchema>) =>
  clientAPI.post(`questions`, { json }).json<RedirectResponseBody>();

const editQuestion = (questionId: number, json: z.infer<typeof questionEditSchema>) =>
  clientAPI.put(`questions/${questionId}`, { json }).json<RedirectResponseBody>();

const deleteQuestion = (questionId: number) => clientAPI.delete(`questions/${questionId}`).json<MessageResponseBody>();

const closeQuestion = (questionId: number) =>
  clientAPI.post(`questions/${questionId}/close`).json<RedirectResponseBody>();

const updateQuestionDraft = (questionId: number, content: string) =>
  clientAPI.patch(`questions/${questionId}/draft`, { json: { content } }).json<MessageResponseBody>();

const deleteQuestionDraft = (questionId: number) =>
  clientAPI.delete(`questions/${questionId}/draft`).json<MessageResponseBody>();

const getQuestionAnswerForEdit = async (questionId: number, answerId: number) =>
  clientAPI.get(`questions/${questionId}/answers/${answerId}/for-edit`).json<QuestionAnswerForEdit>();

const postQuestionAnswer = (questionId: number, json: z.infer<typeof questionAnswerPostSchema>) =>
  clientAPI.post(`questions/${questionId}/answers`, { json }).json<RedirectResponseBody>();

const editQuestionAnswer = (questionId: number, answerId: number, json: z.infer<typeof questionAnswerPostSchema>) =>
  clientAPI.put(`questions/${questionId}/answers/${answerId}`, { json }).json<RedirectResponseBody>();

const deleteQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}`).json<MessageResponseBody>();

const acceptQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.post(`questions/${questionId}/answers/${answerId}/accept`).json<MethodResponseBody>();

const updateQuestionAnswerDraft = (questionId: number, answerId: number, content: string) =>
  clientAPI
    .patch(`questions/${questionId}/answers/${answerId}/draft`, { json: { content } })
    .json<MessageResponseBody>();

const deleteQuestionAnswerDraft = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}/draft`).json<MessageResponseBody>();

const checkGeneratingQuestionAnswer = (questionId: number) =>
  clientAPI.get(`questions/${questionId}/answers/generating`).json<DataResponseBody<boolean>>();

const requestGenerateQuestionAnswer = (questionId: number, json: z.infer<typeof questionAnswerGenerateRequestSchema>) =>
  clientAPI.post(`questions/${questionId}/answers/generate`, { json }).json<MessageResponseBody>();

const existsQuestionStar = (questionId: number) =>
  clientAPI.get(`questions/star/${questionId}`).json<DataResponseBody<boolean>>();

const addQuestionStar = (questionId: number) =>
  clientAPI.post(`questions/star/${questionId}`).json<MethodResponseBody>();

const removeQuestionStar = (questionId: number) =>
  clientAPI.delete(`questions/star/${questionId}`).json<MessageResponseBody>();

export { getQuestionForEdit, postQuestion, editQuestion, deleteQuestion, closeQuestion };
export { updateQuestionDraft, deleteQuestionDraft };
export { getQuestionAnswerForEdit, postQuestionAnswer, editQuestionAnswer, deleteQuestionAnswer, acceptQuestionAnswer };
export { updateQuestionAnswerDraft, deleteQuestionAnswerDraft };
export { checkGeneratingQuestionAnswer, requestGenerateQuestionAnswer };
export { existsQuestionStar, addQuestionStar, removeQuestionStar };
