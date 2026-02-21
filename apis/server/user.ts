import { serverAPI } from '@/apis/server/instance';
import { articleSearchSchema } from '@/schemas/article';
import { questionSearchSchema } from '@/schemas/question';
import { seriesSearchSchema } from '@/schemas/series';
import { userStarSearchSchema } from '@/schemas/user';
import { z } from 'zod';

const getUserDetail = (username: string) => serverAPI.get(`users/@${username}`).json<UserDetail>();

const getUserArticles = async (username: string, searchParams: z.infer<typeof articleSearchSchema>) =>
  serverAPI.get(`users/@${username}/articles`, { searchParams }).json<Page<Article>>();
const getUserSeries = async (username: string, searchParams: z.infer<typeof seriesSearchSchema>) =>
  serverAPI.get(`users/@${username}/series`, { searchParams }).json<Page<Series>>();
const getUserQuestions = async (username: string, searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get(`users/@${username}/questions`, { searchParams }).json<Page<Question>>();
const getUserStars = (username: string, searchParams: z.infer<typeof userStarSearchSchema>) =>
  serverAPI.get(`users/@${username}/stars`, { searchParams }).json<Page<UserStar>>();
const getUserPosts = async (username: string) => serverAPI.get(`users/@${username}/posts`).json<UserPost[]>();

export { getUserDetail, getUserArticles, getUserSeries, getUserQuestions, getUserStars, getUserPosts };
