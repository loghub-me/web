'use client';

import { TopicListItem } from '@/components/client/topic/index';
import TopicList from '@/components/client/topic/list';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTopic } from '@/hooks/use-topic';
import { useQuery } from '@tanstack/react-query';
import { InputWithIcon } from '@ui/input';
import ListEmpty from '@ui/list-empty';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function TopicSearch() {
  const { searchTopics } = useTopic();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 200);

  const { data: searchedTopics, isPending } = useQuery({
    queryKey: ['searchTopics', debouncedQuery],
    queryFn: () => searchTopics(debouncedQuery),
  });

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
      <TopicList>
        {!isPending && searchedTopics?.length === 0 && (
          <ListEmpty message={query ? '검색된 토픽이 없습니다.' : '토픽이 없습니다.'} className="py-4" />
        )}
        {searchedTopics?.map((topic) => (
          <TopicListItem key={topic.slug} topic={topic} />
        ))}
      </TopicList>
    </>
  );
}
