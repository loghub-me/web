import { SeriesAsideLeft, SeriesMetaSkeleton } from '@/components/server/series';

export default function SeriesDetailLoading() {
  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesAsideLeft>
          <SeriesMetaSkeleton />
        </SeriesAsideLeft>
      </div>
    </main>
  );
}
