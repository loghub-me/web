import { Skeleton } from '@ui/skeleton';

export default function SeriesMetaSkeleton() {
  return (
    <div className="py-4 space-y-4">
      <div className="px-4 flex gap-4">
        <Skeleton className="w-18 h-9" aria-label="Series writer skeleton" />
        <Skeleton className="ml-auto w-14 h-9 rounded-full" aria-label="Series star button skeleton" />
      </div>
      <div className="px-4 space-y-4">
        <Skeleton className="aspect-[3/4]" aria-label="Series thumbnail skeleton" />
        <div className="space-y-2">
          <Skeleton className="h-7" aria-label="Series title skeleton" />
          <Skeleton className="w-2/3 h-5" aria-label="Series description skeleton" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="w-14 h-5 rounded-sm" aria-label="Series topic skeleton" />
            <Skeleton className="w-14 h-5 rounded-sm" aria-label="Series topic skeleton" />
          </div>
        </div>
        <Skeleton className="ml-auto w-12 h-4 rounded-sm" aria-label="Series timestamp skeleton" />
      </div>
    </div>
  );
}
