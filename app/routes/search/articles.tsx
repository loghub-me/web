import type { Route } from './+types/articles';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { searchArticles } from '~/apis/server/articles';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '~/components/articles';
import { PageNavSkeleton } from '~/components/common/page-nav';
import PageNav from '~/components/search/page-nav';
import { parseSearchParams } from '~/lib/parse';
import { articlesSearchSchema } from '~/schemas/articles';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, articlesSearchSchema);
  const articles = searchArticles(searchParams);

  return { articles, url, searchParams };
}

export default function SearchArticleRoute({ loaderData }: Route.ComponentProps) {
  const {
    articles,
    url: { pathname },
    searchParams: { query, sort, page },
  } = loaderData;

  return (
    <main className="space-y-4">
      <ArticleList>
        <Suspense fallback={<ArticleListSkeleton size={4} />}>
          <Await resolve={articles}>
            {(resolved) => resolved.content.map((article) => <ArticleListItem key={article.id} article={article} />)}
          </Await>
        </Suspense>
      </ArticleList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={articles}>
          {(resolved) => (
            <PageNav
              to={`${pathname}?query=${query}&sort=${sort}&page=`}
              currentPage={page}
              totalPages={resolved.page.totalPages}
            />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
