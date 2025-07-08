import { Skeleton } from '~/components/ui/skeleton';

export default function UserPostListSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="p-2 flex items-center gap-2">
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="size-4" />
    </div>
  ));
}
