import type { Route } from './+types/stars';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useOutletContext } from 'react-router';
import { getUserStars } from '~/apis/client/user';
import ListEmpty from '~/components/common/list/empty';
import { PageNavSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { UserStarList, UserStarListItem, UserStarListSkeleton } from '~/components/user';
import { createMetadata } from '~/constants/meta';
import { parseParams, parseSearchParams } from '~/lib/parse';
import { usernameSchema } from '~/schemas/common';
import { userStarPageSchema } from '~/schemas/user';

export const meta: Route.MetaFunction = ({ data }) => {
  const username = data?.username;
  const title = `${username}님의 스타`;
  const description = `${username}님의 스타를 확인하세요.`;
  return createMetadata(title, description);
};

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { username } = parseParams(params, usernameSchema);
  const searchParams = parseSearchParams(url.searchParams, userStarPageSchema);
  return { username, searchParams };
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
