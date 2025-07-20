import { serverAPI } from '~/apis/server/instance';

export const getTrendingTopics = () => serverAPI.get('topics/trending').json<Topic[]>();

export const getTopicBySlug = (slug: string) => serverAPI.get(`topics/${slug}`).json<TopicDetail>();

export const getTrendingArticlesByTopicSlug = (slug: string) =>
  serverAPI.get(`topics/${slug}/articles/trending`).json<Article[]>();

export const getTrendingSeriesByTopicSlug = (slug: string) =>
  serverAPI.get(`topics/${slug}/series/trending`).json<Series[]>();

export const getTrendingQuestionsByTopicSlug = (slug: string) =>
  serverAPI.get(`topics/${slug}/questions/trending`).json<Question[]>();
