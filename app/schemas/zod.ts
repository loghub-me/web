import { z } from 'zod';

export const emailZod = z.string().email('올바른 이메일 형식이 아닙니다.').trim();
export const usernameZod = z
  .string()
  .trim()
  .min(4, '유저명은 4글자 이상이어야 합니다.')
  .max(12, '유저명은 12글자 이하여야 합니다.');
export const nicknameZod = z
  .string()
  .trim()
  .min(2, '닉네임은 2글자 이상이어야 합니다.')
  .max(12, '닉네임은 12글자 이하여야 합니다.');
export const otpZod = z.string().trim().min(6, '인증번호는 6자리여야 합니다.').max(6, '인증번호는 6자리여야 합니다.');

export const queryZod = z.string().trim().optional().default('');
export const sortZod = z.enum(['latest', 'oldest', 'trending']).default('latest');
export const pageZod = z.coerce.number().int().min(1).default(1);
export const compositeKeySchema = z.object({
  username: z
    .string()
    .trim()
    .startsWith('@') // startsWith('@')
    .transform((value) => value.replace('@', '')), // replace('@', '')
  slug: z.string().trim(),
});
