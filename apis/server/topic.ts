import { serverAPI } from '@/apis/server/instance';

const getTrendingTopics = async () => serverAPI.get('topics/trending').json<Topic[]>();

const getTopicDetail = (topicSlug: string) => serverAPI.get(`topics/${topicSlug}`).json<TopicDetail>();

const getTopicTrendingPosts = (topicSlug: string, target: TopicDetailView) => {
  const res = serverAPI.get(`topics/${topicSlug}/${target}/trending`);
  switch (target) {
    case 'articles':
      return res.json<Article[]>();
    case 'series':
      return res.json<Series[]>();
    case 'questions':
      return res.json<Question[]>();
  }
};

export { getTrendingTopics, getTopicDetail, getTopicTrendingPosts };
