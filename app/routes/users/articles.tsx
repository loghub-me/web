import type { Route } from './+types/articles';
import { Suspense, useRef } from 'react';
import { Await, Form } from 'react-router';
import { searchUserArticles } from '~/apis/server/user';
import { ArticleList, ArticleListItem, ArticleListSkeleton } from '~/components/article';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { SearchQuery, SearchSort, SearchSubmit } from '~/components/search';
import PageNav from '~/components/search/page-nav';
import { ARTICLE_SORT_OPTIONS } from '~/constants/options';
import { parseParams, parseSearchParams } from '~/lib/parse';
import { articleSearchSchema } from '~/schemas/article';
import { usernameSchema } from '~/schemas/common';

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { username } = parseParams(params, usernameSchema);
  const searchParams = parseSearchParams(url.searchParams, articleSearchSchema);
  const articles = searchUserArticles(username, searchParams);

  return { articles, url, searchParams };
}

export default function UserArticlesRoute({ loaderData }: Route.ComponentProps) {
  const {
    articles,
    url: { pathname },
    searchParams: { query, sort, page },
  } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="space-y-4">
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
                return <ListEmpty className="col-span-4" message="검색된 아티클이 없습니다." />;
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
