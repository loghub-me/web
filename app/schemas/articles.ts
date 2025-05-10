import { compositeKeySchema, pageZod as page, queryZod as query, sortZod as sort } from './zod';
import { z } from 'zod';

export const articlesSearchSchema = z.object({
  query,
  sort,
  page,
});

export const articlesDetailSchema = compositeKeySchema;
