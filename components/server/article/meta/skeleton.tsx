import { Skeleton } from '@ui/skeleton';

export default function ArticleMetaSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="aspect-[16/9]" aria-label="Article thumbnail skeleton" />
      <div className="space-y-2">
        <Skeleton className="h-7" aria-label="Article title skeleton" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-14 h-5 rounded-sm" aria-label="Article topic skeleton" />
          <Skeleton className="w-14 h-5 rounded-sm" aria-label="Article topic skeleton" />
        </div>
      </div>
      <Skeleton className="ml-auto w-12 h-4 rounded-sm" aria-label="Article timestamp skeleton" />
    </div>
  );
}
