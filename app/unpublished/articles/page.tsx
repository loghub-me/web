'use client';

import { searchUnpublishedArticles } from '@/apis/client/user';
import {
  ArticleUnpublishedHero,
  ArticleUnpublishedList,
  ArticleUnpublishedListItem,
} from '@/components/client/article';
import { useAuth } from '@/hooks/use-auth';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useQuery } from '@tanstack/react-query';
import { ButtonLink } from '@ui/button-link';
import { InputWithIcon } from '@ui/input';
import ListEmpty from '@ui/list-empty';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function ArticleUnpublishedPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 200);

  const { status: authStatus } = useAuth();
  const { data: articles, isPending } = useQuery({
    queryKey: ['searchUnpublishedArticles', debouncedQuery],
    queryFn: () => searchUnpublishedArticles(debouncedQuery),
    enabled: authStatus === 'authenticated',
    staleTime: 0,
  });

  return (
    <main className="max-w-3xl mx-auto px-4 py-20 pt-24 min-h-screen space-y-4">
      <ArticleUnpublishedHero />
      <InputWithIcon
        type={'text'}
        name={'query'}
        icon={SearchIcon}
        placeholder={'검색어를 입력해주세요...'}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <ArticleUnpublishedList>
        {isPending && <ListEmpty message="검색 중..." className="my-4" />}
        {!isPending && articles && articles.length === 0 && (
          <ListEmpty message="검색된 아티클이 없습니다." className="my-4" />
        )}
        {articles && articles.map((article) => <ArticleUnpublishedListItem key={article.id} article={article} />)}
      </ArticleUnpublishedList>
      <p className="py-2 text-sm text-center text-muted-foreground">
        <ButtonLink href={'/post/articles'} variant={'link'} className="p-0 h-fit">
          아티클 작성하기
        </ButtonLink>{' '}
        에서 새 아티클을 작성할 수 있습니다.
      </p>
    </main>
  );
}
