import { z } from 'zod';
import { serverAPI } from '~/apis/server/instance';
import type { questionSearchSchema } from '~/schemas/question';

export const searchQuestions = (searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get('questions', { searchParams }).json<Page<Question>>();

export const getQuestion = (username: string, slug: string) =>
  serverAPI.get(`questions/@${username}/${slug}`).json<QuestionDetail>();
