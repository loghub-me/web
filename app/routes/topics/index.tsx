import type { Route } from './+types/index';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { getTrendingTopics } from '~/apis/server/topic';
import { TopicList, TopicListItem } from '~/components/topic';
import { IconInput } from '~/components/ui/icon-input';
import { searchTopics } from '~/constants/topics';
import { parseSearchParams } from '~/lib/parse';
import { topicSearchSchema } from '~/schemas/topic';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, topicSearchSchema);
  const trendingTopics = await getTrendingTopics();
  return { trendingTopics, searchParams };
};

export default function TopicIndex({ loaderData }: Route.ComponentProps) {
  const { trendingTopics } = loaderData;
  const [query, setQuery] = useState('');
  const queried = query.trim().length > 0;
  const topics = query.trim().length > 0 ? searchTopics(query.trim()) : trendingTopics;

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <IconInput
        icon={SearchIcon}
        type="text"
        placeholder="토픽을 검색하세요..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <p className="text-sm text-center text-muted-foreground">
        {queried ? `총 ${topics.length}개의 검색 결과가 있습니다.` : '인기 있는 토픽을 확인해보세요.'}
      </p>
      <TopicList>
        {topics.map((topic) => (
          <TopicListItem key={topic.slug} topic={topic} />
        ))}
      </TopicList>
    </main>
  );
}
