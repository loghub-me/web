import { cn } from '~/lib/utils';

interface BookReviewListProps {
  children: React.ReactNode;
  className?: string;
}

export default function BookReviewList({ children, className }: Readonly<BookReviewListProps>) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}
