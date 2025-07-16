import { commentContentZod as reviewContentZod, idZod, pageZod, queryZod, sortZod } from './zod';
import { z } from 'zod';

export const seriesSearchSchema = z.object({ query: queryZod, sort: sortZod, page: pageZod });

export const seriesPostSchema = z.object({
  title: z.string().min(1).max(128),
  content: z.string().min(10).max(2048),
  thumbnail: z.string(),
  topicSlugs: z.array(z.string()),
});

export const seriesEditSchema = seriesPostSchema;

export const seriesChapterEditSchema = z.object({
  title: z.string().min(1).max(128),
  content: z.string().min(10).max(2048),
});

export const seriesReviewPageSchema = z.object({ reviewPage: pageZod });

export const seriesReviewPostSchema = z.object({
  content: reviewContentZod,
  rating: z.coerce.number().int().min(1).max(5),
  seriesId: idZod,
});
