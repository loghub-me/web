import { PageSkeleton } from '@/components/client/page';
import { SeriesList, SeriesListSkeleton } from '@/components/server/series';

export default function SeriesSearchSkeleton() {
  return (
    <>
      <SeriesList>
        <SeriesListSkeleton />
      </SeriesList>
      <PageSkeleton />
    </>
  );
}
