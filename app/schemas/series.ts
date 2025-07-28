import { z } from 'zod';
import zodFields from '~/schemas/fields';

const { content, id, page, query, sort, thumbnail, title, topicSlugs } = zodFields;

const seriesSearchSchema = z.object({ query, sort, page });
const seriesPostSchema = z.object({ title, content, thumbnail, topicSlugs });
const seriesChapterEditSchema = z.object({ title, content });
const seriesReviewPageSchema = z.object({ reviewPage: page });
const seriesReviewPostSchema = z.object({
  content: z
    .string({ message: '리뷰 내용은 문자열이어야 합니다.' })
    .trim()
    .min(1, { message: '리뷰를 입력해주세요.' })
    .max(255, { message: '리뷰는 최대 255자까지 입력할 수 있습니다.' }),
  rating: z.coerce
    .number({ message: '평점은 숫자여야 합니다.' })
    .int({ message: '평점은 정수여야 합니다.' })
    .min(1, { message: '평점은 1점 이상이어야 합니다.' })
    .max(5, { message: '평점은 5점 이하이어야 합니다.' }),
  seriesId: id,
});

export {
  seriesSearchSchema,
  seriesPostSchema,
  seriesChapterEditSchema,
  seriesReviewPageSchema,
  seriesReviewPostSchema,
};
