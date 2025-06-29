import { cn } from '~/lib/utils';

interface ArticleCommentListProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticleCommentList({ children, className }: Readonly<ArticleCommentListProps>) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}
