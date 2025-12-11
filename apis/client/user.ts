'use client';

import { clientAPI } from '@/apis/client/instance';
import {
  usernameUpdateSchema,
  userGitHubUpdateSchema,
  userProfileUpdateSchema,
  userPrivacyUpdateSchema,
} from '@/schemas/user';
import z from 'zod';

const searchArticlesForImport = async (query: string) =>
  clientAPI.get(`users/articles/for-import`, { searchParams: { query } }).json<ArticleForImport[]>();

const getActivitySummaries = (userId: number) =>
  clientAPI.get(`users/${userId}/activities`).json<UserActivitySummary[]>();
const getActivities = (userId: number, date: string) =>
  clientAPI.get(`users/${userId}/activities/${date}`).json<UserActivity[]>();

const updateSelfUsername = (json: z.infer<typeof usernameUpdateSchema>) =>
  clientAPI.put(`users/username`, { json }).json<MessageResponseBody>();
const updateSelfAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.put('users/avatar', { body: formData }).json<DataResponseBody<string>>();
};

const getSelfGitHub = async () => clientAPI.get('users/github').json<UserGitHub>();
const updateSelfGitHub = async (json: z.infer<typeof userGitHubUpdateSchema>) =>
  clientAPI.put('users/github', { json }).json<MessageResponseBody>();
const deleteSelfGitHub = async () => clientAPI.delete('users/github').json<MessageResponseBody>();
const verifySelfGitHub = async () => clientAPI.post('users/github/verify').json<MessageResponseBody>();

const getSelfProfile = async () => clientAPI.get('users/profile').json<UserProfile>();
const updateSelfProfile = (json: z.infer<typeof userProfileUpdateSchema>) =>
  clientAPI.put('users/profile', { json }).json<MessageResponseBody>();

const getSelfPrivacy = async () => clientAPI.get('users/privacy').json<UserPrivacy>();
const updateSelfPrivacy = (json: z.infer<typeof userPrivacyUpdateSchema>) =>
  clientAPI.put('users/privacy', { json }).json<MessageResponseBody>();

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.post('users/image/upload', { body: formData }).json<DataResponseBody<string>>();
};

export { searchArticlesForImport };
export { getActivitySummaries, getActivities };
export { updateSelfUsername, updateSelfAvatar };
export { getSelfGitHub, updateSelfGitHub, deleteSelfGitHub, verifySelfGitHub };
export { getSelfProfile, updateSelfProfile };
export { getSelfPrivacy, updateSelfPrivacy };
export { uploadImage };
