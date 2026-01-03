import { SeriesChapterTOCSkeleton } from '@/components/client/series';
import { SeriesAsideRight } from '@/components/server/series';
import { Skeleton } from '@ui/skeleton';

export default function SeriesDetailLoading() {
  return (
    <>
      <div className="p-4 w-full min-w-0 space-y-4">
        <Skeleton className="w-24 h-9" />
        <Skeleton className="w-2/3 h-7" />
      </div>
      <SeriesAsideRight>
        <SeriesChapterTOCSkeleton />
      </SeriesAsideRight>
    </>
  );
}
