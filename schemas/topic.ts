import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { slug, page } = zodFields;

const topicDetailSchema = z.object({ slug });

const sort = z.literal(['trending', 'latest', 'oldest'], { message: '잘못된 정렬 기준입니다.' }).default('trending');
const topicArticlesSearchParams = z.object({ sort, page });
const topicSeriesSearchParams = z.object({ sort, page });
const topicQuestionsSearchParams = z.object({ sort, page });

export { topicDetailSchema };
export { topicArticlesSearchParams, topicSeriesSearchParams, topicQuestionsSearchParams };
