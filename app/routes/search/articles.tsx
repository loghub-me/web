import type { Route } from './+types/articles';
import { Suspense, useRef } from 'react';
import { Await, Form } from 'react-router';
import { searchArticles } from '~/apis/server/articles';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '~/components/articles';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { SearchQuery, SearchSort, SearchSubmit } from '~/components/search';
import PageNav from '~/components/search/page-nav';
import { ARTICLE_SORT_OPTIONS } from '~/constants/sorts';
import { parseSearchParams } from '~/lib/parse';
import { articlesSearchSchema } from '~/schemas/articles';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, articlesSearchSchema);
  const articles = searchArticles(searchParams);

  return { articles, url, searchParams };
}

export default function SearchArticlesRoute({ loaderData }: Route.ComponentProps) {
  const {
    articles,
    url: { pathname },
    searchParams: { query, sort, page },
  } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <Form action={pathname} ref={formRef} className="flex gap-2">
        <SearchSort
          submit={() => formRef.current?.requestSubmit()}
          currentSort={sort}
          sortOptions={ARTICLE_SORT_OPTIONS}
        />
        <SearchQuery />
        <SearchSubmit />
      </Form>
      <ArticleList>
        <Suspense fallback={<ArticleListSkeleton size={4} />}>
          <Await resolve={articles}>
            {(resolved) => {
              if (resolved.content.length === 0) {
                return <ListEmpty message="검색된 아티클이 없습니다." />;
              }
              return resolved.content.map((article) => <ArticleListItem key={article.id} article={article} />);
            }}
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
