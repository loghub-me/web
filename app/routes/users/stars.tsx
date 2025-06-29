import type { Route } from './+types/stars';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { getUserStars } from '~/apis/server/users';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { StarList, StarListItem, StarListSkeleton } from '~/components/star';
import { parseParams, parseSearchParams } from '~/lib/parse';
import { pageSchema, usernameSchema } from '~/schemas/zod';

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { username } = parseParams(params, usernameSchema);
  const searchParams = parseSearchParams(url.searchParams, pageSchema);
  const stars = getUserStars(username, searchParams);

  return { stars, url, searchParams };
}

export default function UserStarsRoute({ loaderData }: Route.ComponentProps) {
  const {
    stars,
    url: { pathname },
    searchParams: { page },
  } = loaderData;

  return (
    <main className="space-y-4">
      <StarList>
        <Suspense fallback={<StarListSkeleton size={4} />}>
          <Await resolve={stars}>
            {(resolved) => {
              if (resolved.content.length === 0) {
                return <ListEmpty message="아직 스타한 항목이 없습니다." />;
              }
              return resolved.content.map((star) => <StarListItem key={star.id} star={star} />);
            }}
          </Await>
        </Suspense>
      </StarList>
      <Suspense fallback={<PageNavSkeleton />}>
        <Await resolve={stars}>
          {(resolved) => <PageNav to={`${pathname}`} currentPage={page} totalPages={resolved.page.totalPages} />}
        </Await>
      </Suspense>
    </main>
  );
}
