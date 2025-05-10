import type { Route } from './+types/articles';
import { Await } from 'react-router';
import { searchArticles } from '~/apis/server/articles';
import { ArticleList, ArticleListItem } from '~/components/articles';
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
        <Await resolve={articles}>
          {(resolved) => resolved.content.map((article) => <ArticleListItem key={article.id} article={article} />)}
        </Await>
      </ArticleList>
      <Await resolve={articles}>
        {(resolved) => (
          <PageNav
            to={`${pathname}?query=${query}&sort=${sort}&page=`}
            currentPage={page}
            totalPages={resolved.page.totalPages}
          />
        )}
      </Await>
    </main>
  );
}
