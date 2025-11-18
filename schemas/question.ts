import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;
const { coercedId } = zodFields;
const { title, content, topicSlugs } = zodFields;

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
const questionAnswerEditPageSchema = z.object({ id: coercedId, answerId: coercedId });
const questionAnswerGenerateRequestSchema = z.object({
  instruction: z.string().max(512, { message: '추가 요청사항은 최대 512자까지 입력할 수 있습니다.' }).optional(),
  chatModel: z.enum(['GPT_4_1_MINI', 'GPT_5', 'O3'], { message: '잘못된 모델입니다.' }).default('GPT_4_1_MINI'),
});

export { questionSearchSchema, questionPostSchema, questionEditSchema };
export { questionAnswerPostSchema, questionAnswerEditSchema, questionAnswerEditPageSchema };
export { questionAnswerGenerateRequestSchema };
