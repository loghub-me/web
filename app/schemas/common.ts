import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .startsWith('@') // startsWith('@')
    .transform((value) => value.replace('@', '')), // replace('@', '')
});
export const slugSchema = z.object({ slug: z.string().trim() });
export const compositeKeySchema = usernameSchema.merge(slugSchema);
