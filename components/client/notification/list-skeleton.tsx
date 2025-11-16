import { Skeleton } from '@ui/skeleton';

export default function NotificationListSkeleton({ size = 4 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="flex items-center gap-2 p-4 border-b last:border-b-0">
      <Skeleton className="size-5" />
      <div className="flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-1/3 h-5" />
        </div>
      </div>
    </div>
  ));
}
