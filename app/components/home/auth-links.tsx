import { useQuery } from '@tanstack/react-query';
import { LogInIcon, UserPlusIcon } from 'lucide-react';
import { getUserActivitySummaries } from '~/apis/client/user';
import { ButtonLink } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { UserActivityCalendar, UserLink } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';

export default function HomeAuthLinks() {
  const { status, session } = useAuth();
  const { data: summaries } = useQuery({
    queryKey: ['getUserActivitySummaries', session?.username],
    queryFn: () => getUserActivitySummaries(session!.id),
    enabled: status === 'authenticated',
  });

  switch (status) {
    case 'loading':
      return (
        <div className="flex justify-center gap-2">
          <Skeleton className="w-24 h-9 rounded-md" />
          <Skeleton className="w-24 h-9 rounded-md" />
        </div>
      );
    case 'unauthenticated':
      return (
        <div className="flex justify-center gap-2">
          <ButtonLink to={'/join'} variant="outline">
            <UserPlusIcon /> 회원가입
          </ButtonLink>
          <ButtonLink to={'/login'} variant={'default'}>
            <LogInIcon /> 로그인
          </ButtonLink>
        </div>
      );
    case 'authenticated':
      return (
        session &&
        summaries && (
          <div className="flex flex-col items-center gap-4 w-full">
            <UserLink {...session} message={'님의 활동'} />
            <UserActivityCalendar username={session.username} summaries={summaries} />
          </div>
        )
      );
  }
}
