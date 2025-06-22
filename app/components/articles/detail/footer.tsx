import { CardFooter } from '~/components/ui/card';
import { parseRelativeTime } from '~/lib/parse';
import { cn } from '~/lib/utils';

interface ArticleDetailFooterProps {
  createdAt: string;
  updatedAt: string;
}

export default function ArticleDetailFooter({ createdAt, updatedAt }: Readonly<ArticleDetailFooterProps>) {
  return (
    <CardFooter>
      <hr className="mb-4" />
      <p className="text-muted-foreground text-sm text-right">
        <span>작성: {parseRelativeTime(createdAt)}</span>
        <span className={cn(createdAt === updatedAt ? 'hidden' : '')}>(수정: {parseRelativeTime(updatedAt)})</span>
      </p>
    </CardFooter>
  );
}
