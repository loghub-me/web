'use client';

import { getActivities, getActivitySummaries } from '@/apis/client/user';
import {
  UserActivityCalendar,
  UserActivityList,
  UserActivityListItem,
  UserActivityListSkeleton,
} from '@/components/client/user';
import { useQuery } from '@tanstack/react-query';
import { Card, CardDescription, CardHeader } from '@ui/card';
import ListEmpty from '@ui/list-empty';

interface UserActivitiesProps {
  userId: number;
  username: string;
  date?: string;
}

export default function UserActivities({ userId, username, date }: Readonly<UserActivitiesProps>) {
  const { data: summaries } = useQuery({
    queryKey: ['getActivitySummaries', userId],
    queryFn: () => getActivitySummaries(userId),
  });
  const { data: activities, isLoading } = useQuery({
    queryKey: ['getActivityDetail', userId, date],
    queryFn: () => getActivities(userId, date!),
    enabled: !!date,
  });

  return (
    <>
      {summaries && <UserActivityCalendar username={username} summaries={summaries} />}
      {date && (
        <Card className="gap-2 pb-2">
          <CardHeader className="space-y-1.5 pb-4 border-b">
            <CardDescription className="font-medium">{date}</CardDescription>
          </CardHeader>
          <UserActivityList>
            {isLoading && <UserActivityListSkeleton size={4} />}
            {activities?.length === 0 && <ListEmpty message="활동이 없습니다" className="py-4" />}
            {activities?.map((activity) => (
              <UserActivityListItem key={activity.id} activity={activity} />
            ))}
          </UserActivityList>
        </Card>
      )}
    </>
  );
}
