import { clientAPI } from './instance';
import { z } from 'zod';
import type { usernameUpdateSchema, userPrivacyUpdateSchema, userProfileUpdateSchema } from '~/schemas/user';

export const getSelfProfile = () => clientAPI.get(`users/self/profile`).json<UserProfile>();
export const getSelfPrivacy = () => clientAPI.get(`users/self/privacy`).json<UserPrivacy>();
export const getUserActivitySummaries = (userId: number) =>
  clientAPI.get(`users/${userId}/activities`).json<UserActivitySummary[]>();
export const getUserActivities = (userId: number, date: string) =>
  clientAPI.get(`users/${userId}/activities/${date}`).json<UserActivity[]>();
export const getUserStars = (userId: number, page = 1) =>
  clientAPI.get(`users/${userId}/stars`, { searchParams: { page } }).json<Page<UserStar>>();

export const updateSelfUsername = (json: z.infer<typeof usernameUpdateSchema>) =>
  clientAPI.put(`users/self/username`, { json }).json<MessageResponseBody>();
export const updateSelfProfile = (json: z.infer<typeof userProfileUpdateSchema>) =>
  clientAPI.put(`users/self/profile`, { json }).json<MessageResponseBody>();
export const updateSelfPrivacy = (json: z.infer<typeof userPrivacyUpdateSchema>) =>
  clientAPI.put(`users/self/privacy`, { json }).json<MessageResponseBody>();

export const updateSelfAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.put('users/self/avatar', { body: formData }).json<DataResponseBody<string>>();
};

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.post('users/image/upload', { body: formData }).json<DataResponseBody<string>>();
};
