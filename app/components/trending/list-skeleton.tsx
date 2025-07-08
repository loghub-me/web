import { Skeleton } from '~/components/ui/skeleton';

export default function TrendingListSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="space-y-2">
      <Skeleton className="h-7 w-2/3" />
    </div>
  ));
}
