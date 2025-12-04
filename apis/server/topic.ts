import { serverAPI } from '@/apis/server/instance';
import { unstable_cache as cache } from 'next/cache';

const getTrendingTopics = cache(() => serverAPI.get('topics/trending').json<Topic[]>(), [], { revalidate: 3600 });

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
