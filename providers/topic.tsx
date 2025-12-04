'use client';

import { createContext, useCallback, useMemo } from 'react';

type TopicContextProps = {
  searchTopics: (query: string) => Topic[];
  getTopicSetBySlugs: (slugs: Set<string>) => Topic[];
};

export const TopicContext = createContext<TopicContextProps>({
  searchTopics: () => [],
  getTopicSetBySlugs: () => [],
});

interface TopicProviderProps {
  trendingTopics: Topic[];
  children: React.ReactNode;
}

const TOPIC_MAX_SIZE = 8 * 6; // 8 items per row, 6 rows

export default function TopicProvider({ trendingTopics, children }: Readonly<TopicProviderProps>) {
  const topicsMap = useMemo(
    () => new Map<string, Topic>(trendingTopics.map((topic) => [topic.slug, topic])),
    [trendingTopics]
  );

  const searchTopics = useCallback(
    (query: string) => {
      if (query.trim().length === 0) {
        return trendingTopics.slice(0, TOPIC_MAX_SIZE);
      }

      const lowerQuery = query.toLowerCase();
      return trendingTopics.filter((topic) => `${topic.slug} ${topic.name}`.toLowerCase().includes(lowerQuery));
    },
    [trendingTopics]
  );

  const getTopicSetBySlugs = useCallback(
    (slugs: Set<string>) => {
      const topics: Topic[] = [];
      slugs.forEach((slug) => {
        const topic = topicsMap.get(slug);
        if (topic) {
          topics.push(topic);
        }
      });
      return topics;
    },
    [topicsMap]
  );

  return <TopicContext.Provider value={{ searchTopics, getTopicSetBySlugs }}>{children}</TopicContext.Provider>;
}
