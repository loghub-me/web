import { Skeleton } from '@ui/skeleton';

export default function SeriesDetailLoading() {
  return (
    <>
      <div className="w-full min-w-0 space-y-4">
        <Skeleton className="w-24 h-9" />
        <Skeleton className="w-2/3 h-7" />
      </div>
      <aside className="sticky top-4 hidden lg:block max-w-xs w-full h-fit space-y-3">
        <div className="p-4 space-y-2">
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-2/3 h-5" />
        </div>
      </aside>
    </>
  );
}
