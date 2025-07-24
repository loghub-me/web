import type { Route } from './+types/index';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useOutletContext } from 'react-router';
import { getUserActivities, getUserActivitySummaries } from '~/apis/client/user';
import ListEmpty from '~/components/common/list/empty';
import {
  UserActivityCalendar,
  UserActivityList,
  UserActivityListItem,
  UserActivityListSkeleton,
} from '~/components/user';
import { parseSearchParams } from '~/lib/parse';
import { userActivitySearchSchema } from '~/schemas/user';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, userActivitySearchSchema);
  return { searchParams };
}

export default function UserDetailRoute({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<{ user: UserDetail }>();
  const { searchParams } = loaderData;
  const date = searchParams.date?.toISOString().slice(0, 10);
  const { data: summaries } = useQuery({
    queryKey: ['getUserActivitySummaries', user.id],
    queryFn: () => getUserActivitySummaries(user.id),
  });
  const { data: activities, isLoading } = useQuery({
    queryKey: ['getUserActivities', user.id, date],
    queryFn: () => getUserActivities(user.id, date!),
    enabled: !!date,
  });

  return (
    <main className="space-y-4">
      <section className="space-y-4">
        <h3 className="font-semibold">@{user.username}의 활동</h3>
        {summaries && <UserActivityCalendar summaries={summaries} {...user} />}
      </section>
      <section className="space-y-4">
        <h3 className="pl-2 font-semibold border-l-primary border-l-4">{date}</h3>
        <UserActivityList>
          {isLoading && <UserActivityListSkeleton size={4} />}
          {activities?.length === 0 && <ListEmpty message="활동이 없습니다" />}
          {activities?.map((activity) => (
            <UserActivityListItem key={activity.id} activity={activity} user={user} />
          ))}
        </UserActivityList>
      </section>
    </main>
  );
}
