import type { Route } from './+types/series';
import { Suspense, useRef } from 'react';
import { Await, Form } from 'react-router';
import { searchUserSeries } from '~/apis/server/user';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import { SearchQuery, SearchSort, SearchSubmit } from '~/components/search';
import PageNav from '~/components/search/page-nav';
import { SeriesList, SeriesListItem, SeriesListSkeleton } from '~/components/series';
import { SERIES_SORT_OPTIONS } from '~/constants/sorts';
import { parseParams, parseSearchParams } from '~/lib/parse';
import { usernameSchema } from '~/schemas/common';
import { seriesSearchSchema } from '~/schemas/series';

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { username } = parseParams(params, usernameSchema);
  const searchParams = parseSearchParams(url.searchParams, seriesSearchSchema);
  const series = searchUserSeries(username, searchParams);

  return { series, url, searchParams };
}

export default function UserSeriesRoute({ loaderData }: Route.ComponentProps) {
  const {
    series,
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
          sortOptions={SERIES_SORT_OPTIONS}
        />
        <SearchQuery />
        <SearchSubmit />
      </Form>
      <SeriesList>
        <Suspense fallback={<SeriesListSkeleton size={4} />}>
          <Await resolve={series}>
            {(resolved) => {
              if (resolved.content.length === 0) {
                return <ListEmpty className="col-span-4" message="검색된 시리즈가 없습니다." />;
              }
              return resolved.content.map((series) => <SeriesListItem key={series.id} series={series} />);
            }}
          </Await>
        </Suspense>
      </SeriesList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={series}>
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
