import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, coercedDate } = zodFields;
const { username, nickname } = zodFields;

const usernameSchema = z.object({ username: z.string({ message: '사용자 이름은 문자열이어야 합니다.' }).trim() });
const userDetailSchema = usernameSchema;
const userStarSearchSchema = z.object({ page });
const userActivitySearchSchema = z.object({ date: coercedDate.optional() });

const usernameUpdateSchema = z.object({
  oldUsername: username,
  newUsername: username,
});
const userProfileUpdateSchema = z.object({
  nickname,
  readme: z.string().max(1024, 'README는 1024자 이하여야 합니다.').optional(),
});
const userPrivacyUpdateSchema = z.object({ emailPublic: z.boolean() });
const githubUsernameRegex = /^[a-zA-Z0-9-]{1,39}$/;
const userGitHubUpdateSchema = z.object({
  username: z
    .string()
    .min(3, 'GitHub 유저네임은 3자 이상이어야 합니다.')
    .max(39, 'GitHub 유저네임은 39자 이하여야 합니다.')
    .regex(githubUsernameRegex, { message: 'GitHub 유저네임은 영문 대소문자, 숫자, 하이픈(-)으로만 입력해주세요.' }),
});

export { usernameSchema, userDetailSchema, userStarSearchSchema, userActivitySearchSchema };
export { usernameUpdateSchema, userProfileUpdateSchema, userPrivacyUpdateSchema, userGitHubUpdateSchema };
