import { getTopicArticles } from '@/apis/server/topic';
import { PageNav } from '@/components/client/page';
import { TopicArticlesSort } from '@/components/client/topic';
import { ArticleSearchSkeleton, ArticleList, ArticleListItem } from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema, topicArticlesSearchParams } from '@/schemas/topic';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';
import z from 'zod';

export default async function TopicArticlesPage({ params, searchParams }: PageProps<'/topics/[slug]/articles'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, topicArticlesSearchParams);
  const articles = getTopicArticles(parsedParam.slug, parsedSearchParams);

  return (
    <main className="space-y-4">
      <TopicArticlesSort slug={parsedParam.slug} searchParams={parsedSearchParams} />
      <Suspense fallback={<ArticleSearchSkeleton />}>
        <TopicArticlesResult articles={articles} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}

interface TopicArticlesResultProps {
  articles: Promise<Page<Article>>;
  searchParams: z.infer<typeof topicArticlesSearchParams>;
}

async function TopicArticlesResult({ articles, searchParams }: Readonly<TopicArticlesResultProps>) {
  const resolvedArticles = await articles;

  return (
    <>
      <ArticleList>
        {resolvedArticles.content.length === 0 && <ListEmpty message={'검색된 아티클이 없습니다.'} className="py-4" />}
        {resolvedArticles.content.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </ArticleList>
      <PageNav currentPage={searchParams.page} totalPages={resolvedArticles.page.totalPages} />
    </>
  );
}
