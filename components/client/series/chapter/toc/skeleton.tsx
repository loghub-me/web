import { Skeleton } from '@ui/skeleton';

export default function SeriesChapterTOCSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="w-9 h-5" aria-label="Series Chapter TOC title skeleton" />
      <div className="space-y-1">
        <Skeleton className="h-7" aria-label="Series Chapter TOC item skeleton" />
        <Skeleton className="h-7" aria-label="Series Chapter TOC item skeleton" />
      </div>
    </div>
  );
}
