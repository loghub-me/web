import { Skeleton } from '~/components/ui/skeleton';

export default function ArticleListSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="space-y-2">
      <div className="flex flex-wrap items-center gap-1">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-7 w-1/3" />
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-1">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="w-12 h-4" />
        </div>
        <Skeleton className="ml-auto w-8 h-4" />
      </div>
    </div>
  ));
}
