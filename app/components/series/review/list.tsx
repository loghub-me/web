import { cn } from '~/lib/utils';

interface SeriesReviewListProps {
  children: React.ReactNode;
  className?: string;
}

export default function SeriesReviewList({ children, className }: Readonly<SeriesReviewListProps>) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}
