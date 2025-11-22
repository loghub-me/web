'use client';

import { TopicRequestDialog } from '@/components/client/support';
import { TopicListItem } from '@/components/client/topic/index';
import TopicList from '@/components/client/topic/list';
import { searchTopics } from '@/constants/topics';
import { useAuth } from '@/hooks/use-auth';
import { InputWithIcon } from '@ui/input';
import ListEmpty from '@ui/list-empty';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface TrendingTopicsProps {
  trendingTopics: Topic[];
}

export default function TopicSearch({ trendingTopics }: Readonly<TrendingTopicsProps>) {
  const [query, setQuery] = useState('');
  const topics = query.trim().length === 0 ? trendingTopics : searchTopics(query);
  const { status: authStatus } = useAuth();

  return (
    <>
      <InputWithIcon
        type={'text'}
        name={'query'}
        icon={SearchIcon}
        placeholder={'검색어를 입력해주세요...'}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      {authStatus === 'authenticated' && <TopicRequestDialog className="text-center" />}
      <TopicList>
        {topics.length === 0 && (
          <ListEmpty message={query ? '검색된 토픽이 없습니다.' : '토픽이 없습니다.'} className="py-4" />
        )}
        {topics.map((topic) => (
          <TopicListItem key={topic.slug} topic={topic} />
        ))}
      </TopicList>
    </>
  );
}
