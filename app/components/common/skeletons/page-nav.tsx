import { Skeleton } from '~/components/ui/skeleton';

export default function PageNavSkeleton({ size = 1 }: Readonly<SkeletonProps>) {
  return (
    <div className="flex justify-center">
      {Array.from({ length: size }, (_, index) => (
        <Skeleton key={index} className="size-9" />
      ))}
    </div>
  );
}
