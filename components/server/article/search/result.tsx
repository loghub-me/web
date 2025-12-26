import { PageNav } from '@/components/client/page';
import { ArticleList, ArticleListItem } from '@/components/server/article';
import { articleSearchSchema } from '@/schemas/article';
import ListEmpty from '@ui/list-empty';
import z from 'zod';

interface ArticleSearchResultProps {
  articles: Promise<Page<Article>>;
  searchParams: z.infer<typeof articleSearchSchema>;
}

export default async function ArticleSearchResult({ articles, searchParams }: Readonly<ArticleSearchResultProps>) {
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
