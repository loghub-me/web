import { getUserArticles } from '@/apis/server/user';
import { ArticleSearchForm } from '@/components/client/article';
import { ArticleSearchResult, ArticleSearchSkeleton } from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { articleSearchSchema } from '@/schemas/article';
import { userDetailSchema } from '@/schemas/user';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: PageProps<'/[username]/articles'>): Promise<Metadata> {
  const parsedParam = parseObject(await params, userDetailSchema);
  return {
    title: `@${parsedParam.username} - 아티클`,
    description: `${parsedParam.username}님의 프로필 페이지입니다.`,
  };
}

export default async function UserArticleSearchPage({ params, searchParams }: PageProps<'/[username]/articles'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, articleSearchSchema);
  const articles = getUserArticles(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <ArticleSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/articles`} />

      <Suspense fallback={<ArticleSearchSkeleton />}>
        <ArticleSearchResult articles={articles} searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
