import { clientAPI } from './instance';
import { z } from 'zod';
import { usernameUpdateSchema, type userPrivacyUpdateSchema, type userProfileUpdateSchema } from '~/schemas/user';

export const getSelfPosts = () => clientAPI.get(`users/self/posts`).json<UserPost[]>();
export const getSelfProfile = () => clientAPI.get(`users/self/profile`).json<UserProfile>();
export const getSelfPrivacy = () => clientAPI.get(`users/self/privacy`).json<UserPrivacy>();

export const updateSelfUsername = (json: z.infer<typeof usernameUpdateSchema>) =>
  clientAPI.put(`users/self/username`, { json }).json<MessageResponseBody>();
export const updateSelfProfile = (json: z.infer<typeof userProfileUpdateSchema>) =>
  clientAPI.put(`users/self/profile`, { json }).json<MessageResponseBody>();
export const updateSelfPrivacy = (json: z.infer<typeof userPrivacyUpdateSchema>) =>
  clientAPI.put(`users/self/privacy`, { json }).json<MessageResponseBody>();
