import { z } from 'zod';

export const topicSearchSchema = z.object({ view: z.enum(['articles', 'series', 'questions']).default('articles') });
