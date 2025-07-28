import { z } from 'zod';

const topicSearchSchema = z.object({
  view: z.enum(['articles', 'series', 'questions'], { message: '잘못된 view 값입니다.' }).default('articles'),
});

export { topicSearchSchema };
