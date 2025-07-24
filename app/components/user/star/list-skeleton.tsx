import { Skeleton } from '~/components/ui/skeleton';

export default function UserStarListSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="ml-auto h-7 w-12" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-12 h-7" />
        <Skeleton className="w-12 h-7" />
      </div>
    </div>
  ));
}
