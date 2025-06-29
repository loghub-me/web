import { Skeleton } from '~/components/ui/skeleton';

export default function ArticleListSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="space-y-2">
      <Skeleton className="aspect-video" />
      <Skeleton className="h-7 w-2/3" />
      <div className="flex flex-wrap gap-1">
        <Skeleton className="w-12 h-7" />
        <Skeleton className="w-12 h-7" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="ml-auto w-8 h-4" />
      </div>
    </div>
  ));
}
