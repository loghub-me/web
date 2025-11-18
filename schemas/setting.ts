import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { username, nickname } = zodFields;

const settingUsernameUpdateSchema = z.object({
  oldUsername: username,
  newUsername: username,
});
const settingProfileUpdateSchema = z.object({
  nickname,
  readme: z.string().max(1024, 'README는 1024자 이하여야 합니다.').optional(),
});
const settingPrivacyUpdateSchema = z.object({ emailPublic: z.boolean() });

export { settingUsernameUpdateSchema, settingProfileUpdateSchema, settingPrivacyUpdateSchema };
