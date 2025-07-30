import { z } from 'zod';
import zodFields from '~/schemas/fields';

const { nickname, page, username } = zodFields;

const userStarPageSchema = z.object({ page });
const userActivitySearchSchema = z.object({
  date: z.coerce.date({ message: '올바르지 않은 날짜 형식입니다.' }).optional(),
});

const usernameUpdateSchema = z.object({
  oldUsername: username,
  newUsername: username,
});

const userProfileUpdateSchema = z.object({
  nickname,
  readme: z.string({ message: '소개는 문자열이어야 합니다.' }).max(512).optional(),
});

const userPrivacyUpdateSchema = z.object({
  emailVisible: z.boolean(),
  starVisible: z.boolean(),
});

export {
  userStarPageSchema,
  userActivitySearchSchema,
  usernameUpdateSchema,
  userProfileUpdateSchema,
  userPrivacyUpdateSchema,
};
