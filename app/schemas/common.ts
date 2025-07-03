import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .startsWith('@') // startsWith('@')
    .transform((value) => value.replace('@', '')), // replace('@', '')
});
export const compositeKeySchema = usernameSchema.extend({ slug: z.string().trim() });
