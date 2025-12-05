import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { email, title, content } = zodFields;

const inquirySchema = z.object({
  email: z.union([z.literal(''), email]),
  title,
  content,
});

const topicRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: '토픽 이름을 입력해주세요.' })
    .max(50, { message: '토픽 이름은 최대 50자까지 이하이어야 합니다.' }),
  description: z
    .string()
    .min(1, { message: '토픽 설명은 10자 이상이어야 합니다.' })
    .max(512, { message: '토픽 설명은 512자 이하이어야 합니다.' }),
});

export { inquirySchema, topicRequestSchema };
