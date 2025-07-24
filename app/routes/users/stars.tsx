import type { Route } from './+types/stars';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useOutletContext } from 'react-router';
import { getUserStars } from '~/apis/client/user';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { UserStarList, UserStarListItem, UserStarListSkeleton } from '~/components/user';
import { parseSearchParams } from '~/lib/parse';
import { userStarPageSchema } from '~/schemas/user';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, userStarPageSchema);
  return { searchParams };
}

export default function UserStarsRoute({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const { user } = useOutletContext<{ user: UserDetail }>();
  const { searchParams } = loaderData;
  const { page } = searchParams;
  const { data: stars, status } = useQuery({
    queryKey: ['getUserStars', user.id, page],
    queryFn: () => getUserStars(user.id, page),
  });

  return (
    <main className="space-y-4">
      <UserStarList>
        {status === 'pending' && <UserStarListSkeleton size={4} />}
        {stars?.content.length === 0 && <ListEmpty message="아직 스타한 항목이 없습니다." />}
        {stars?.content.map((star) => (
          <UserStarListItem key={star.id} star={star} />
        ))}
      </UserStarList>
      {status === 'pending' && <PageNavSkeleton />}
      {stars && <PageNav to={`${pathname}`} currentPage={page} totalPages={stars.page.totalPages} />}
    </main>
  );
}
