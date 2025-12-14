import { TopicLink } from '@/components/client/topic';
import { Button } from '@ui/button';
import { CopyIcon } from 'lucide-react';
import Link from 'next/link';

interface ArticleForImportListItemProps {
  article: ArticleForImport;
  writerUsername: string;
  onImportButtonClick: (articleId: number) => void;
}

export default function ArticleForImportListItem({
  article,
  writerUsername,
  onImportButtonClick,
}: Readonly<ArticleForImportListItemProps>) {
  const { id, slug, title, topics } = article;
  return (
    <div key={id} className="flex items-center gap-2 p-4 border-b last:border-b-0">
      <div className="flex-1 space-y-1.5">
        <h3 className="flex flex-wrap items-center">
          <Link
            href={`/articles/${writerUsername}/${slug}`}
            prefetch={false}
            className="line-clamp-2 font-medium transition-colors hover:text-accent-foreground/50"
          >
            {title}
          </Link>
        </h3>
        {topics.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {topics.map((topic) => (
              <TopicLink key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
      </div>
      <Button type={'button'} variant={'outline'} size={'icon'} onClick={() => onImportButtonClick(id)}>
        <CopyIcon />
      </Button>
    </div>
  );
}
