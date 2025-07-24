import { z } from 'zod';
import { nicknameZod, pageZod, usernameZod } from '~/schemas/zod';

export const userStarPageSchema = z.object({ page: pageZod });
export const userActivitySearchSchema = z.object({
  date: z.coerce.date().optional(),
});

export const usernameUpdateSchema = z.object({
  oldUsername: usernameZod,
  newUsername: usernameZod,
});

export const userProfileUpdateSchema = z.object({
  nickname: nicknameZod,
  readme: z.string().max(512),
});

export const userPrivacyUpdateSchema = z.object({
  emailVisible: z.boolean(),
  starVisible: z.boolean(),
});
