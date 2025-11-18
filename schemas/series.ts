import { compositeKeySchema } from '@/schemas/common';
import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;
const { coercedId, coercedSequence } = zodFields;
const { title, content, thumbnail, topicSlugs } = zodFields;

const seriesSearchSchema = z.object({
  query,
  sort,
  page,
});
const seriesChapterDetailSchema = compositeKeySchema.extend({ sequence: coercedSequence });

const seriesPostSchema = z.object({
  title,
  description: z
    .string({ message: '설명은 문자열이어야 합니다.' })
    .min(10, { message: '설명은 10글자 이상이어야 합니다.' })
    .max(8192, { message: '설명은 8192글자 이하여야 합니다.' }),
  thumbnail,
  topicSlugs,
});
const seriesEditSchema = seriesPostSchema;

const seriesChapterEditSchema = z.object({ title, content });
const seriesChapterEditPageSchema = z.object({ id: coercedId, sequence: coercedSequence });

const seriesReviewPostSchema = z.object({
  content: z
    .string({ message: '리뷰 내용은 문자열이어야 합니다.' })
    .trim()
    .min(1, { message: '리뷰를 입력해주세요.' })
    .max(1024, { message: '리뷰는 최대 1024자까지 입력할 수 있습니다.' }),
  rating: z
    .number({ message: '평점은 숫자여야 합니다.' })
    .int({ message: '평점은 정수여야 합니다.' })
    .min(1, { message: '평점은 1점 이상이어야 합니다.' })
    .max(5, { message: '평점은 5점 이하이어야 합니다.' }),
});
const seriesReviewEditSchema = seriesReviewPostSchema;

export { seriesSearchSchema, seriesChapterDetailSchema, seriesPostSchema, seriesEditSchema };
export { seriesChapterEditSchema, seriesChapterEditPageSchema };
export { seriesReviewPostSchema, seriesReviewEditSchema };
