import { useQuery } from '@tanstack/react-query';
import { getUserActivitySummaries } from '~/apis/client/user';
import { UserActivityCalendar } from '~/components/user';

const ADMIN = {
  id: 1,
  username: 'admin',
};

export default function FeatureGrassCalendar() {
  const { data: summaries } = useQuery({
    queryKey: ['getUserActivitySummaries', ADMIN.id],
    queryFn: () => getUserActivitySummaries(ADMIN.id),
  });

  return (
    <div className="flex items-center justify-center gap-4 p-4 w-full h-full border bg-muted rounded-xl">
      {summaries && <UserActivityCalendar summaries={summaries} username={ADMIN.username} />}
    </div>
  );
}
