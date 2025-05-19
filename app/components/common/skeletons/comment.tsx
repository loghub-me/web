import { Skeleton } from '~/components/ui/skeleton';

export default function CommentSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="space-y-2">
      <div className="flex items-center gap-1">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="size-2 rounded-full" />
        <Skeleton className="w-8 h-4" />
      </div>
      <div className="pl-7">
        <Skeleton className="w-2/3 h-5" />
      </div>
    </div>
  ));
}
