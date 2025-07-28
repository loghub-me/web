import { z } from 'zod';
import zodFields from '~/schemas/fields';

const { content, page, query, sort, title, topicSlugs } = zodFields;

const questionSearchSchema = z.object({
  query,
  sort,
  page,
  filter: z.enum(['all', 'open', 'closed', 'solved'], { message: '잘못된 필터입니다.' }).default('all'),
});
const questionPostSchema = z.object({ title, content, topicSlugs });
const questionEditSchema = questionPostSchema;
const questionAnswerPostSchema = z.object({ title, content });
const questionAnswerEditSchema = questionAnswerPostSchema;

export {
  questionSearchSchema,
  questionPostSchema,
  questionEditSchema,
  questionAnswerPostSchema,
  questionAnswerEditSchema,
};
