import { z } from 'zod';

const usernameRegex = /^@[a-zA-Z0-9]+$/;
const usernameSchema = z.object({
  username: z
    .string({ message: '유저네임은 문자열이어야 합니다.' })
    .trim()
    .regex(usernameRegex, { message: '유저네임은 영문자와 숫자로만 이루어져야 합니다.' })
    .startsWith('@', { message: '유저네임은 @로 시작해야 합니다.' })
    .transform((value) => value.replace('@', '')),
});

const slugSchema = z.object({
  slug: z.string({ message: '슬러그는 문자열이어야 합니다.' }).trim(),
});

const compositeKeySchema = usernameSchema.merge(slugSchema);

export { usernameSchema, slugSchema, compositeKeySchema };
