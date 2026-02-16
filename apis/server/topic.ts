import { serverAPI } from '@/apis/server/instance';
import { topicArticlesSearchParams, topicQuestionsSearchParams, topicSeriesSearchParams } from '@/schemas/topic';
import z from 'zod';

const getTrendingTopics = async () => serverAPI.get('topics/trending').json<Topic[]>();

const getTopicDetail = (topicSlug: string) => serverAPI.get(`topics/${topicSlug}`).json<TopicDetail>();

const getTopicArticles = (topicSlug: string, searchParams: z.infer<typeof topicArticlesSearchParams>) =>
  serverAPI.get(`topics/${topicSlug}/articles`, { searchParams }).json<Page<Article>>();
const getTopicSeries = (topicSlug: string, searchParams: z.infer<typeof topicSeriesSearchParams>) =>
  serverAPI.get(`topics/${topicSlug}/series`, { searchParams }).json<Page<Series>>();
const getTopicQuestions = (topicSlug: string, searchParams: z.infer<typeof topicQuestionsSearchParams>) =>
  serverAPI.get(`topics/${topicSlug}/questions`, { searchParams }).json<Page<Question>>();

export { getTrendingTopics };
export { getTopicDetail };
export { getTopicArticles, getTopicSeries, getTopicQuestions };
