import { z } from 'zod';
import { nicknameZod as nickname, usernameZod as username } from '~/schemas/zod';

export const usernameUpdateSchema = z.object({
  oldUsername: username,
  newUsername: username,
});

export const userProfileUpdateSchema = z.object({
  nickname,
  readme: z.string().max(512),
});

export const userPrivacyUpdateSchema = z.object({
  emailVisible: z.boolean(),
  starVisible: z.boolean(),
});
