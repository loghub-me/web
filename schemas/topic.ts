import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { slug } = zodFields;

const topicDetailSchema = z.object({
  slug,
  view: z.literal(['articles', 'series', 'questions'], { message: '잘못된 화면 요청입니다.' }).default('articles'),
});

export { topicDetailSchema };
