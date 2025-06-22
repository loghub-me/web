import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { questionsSearchSchema } from '~/schemas/questions';

export const searchQuestions = (searchParams: z.infer<typeof questionsSearchSchema>) =>
  serverAPI.get('questions', { searchParams }).json<Page<Question>>();

export const getQuestionSimple = (id: number) => serverAPI.get(`questions/${id}`).json<QuestionSimple>();

export const getQuestion = (username: string, slug: string) =>
  serverAPI.get(`questions/@${username}/${slug}`).json<QuestionDetail>();
