import { getArticles } from '@/apis/server/article';
import { ArticleSearchForm } from '@/components/client/article';
import { ArticleSearchResult, ArticleSearchSkeleton } from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { articleSearchSchema } from '@/schemas/article';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = '아티클 검색';
const description = '아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/search/articles` },
  twitter: { card: 'summary', title, description },
};

export default async function ArticleSearchPage({ searchParams }: PageProps<'/search/articles'>) {
  const parsedSearchParams = parseObject(await searchParams, articleSearchSchema);
  const articles = getArticles(parsedSearchParams);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <ArticleSearchForm defaultValues={parsedSearchParams} />
      <Suspense fallback={<ArticleSearchSkeleton />}>
        <ArticleSearchResult articles={articles} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}
