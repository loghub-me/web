import { ArticleUnpublishedActionMenu } from '@/components/client/article';
import { TopicLink } from '@/components/client/topic';
import { parseRelativeTime } from '@/lib/parse';
import { SimpleTooltip } from '@ui/simple-tooltip';
import { GlobeLockIcon } from 'lucide-react';

interface ArticleUnpublishedListItemProps {
  article: ArticleUnpublished;
}

export default function ArticleUnpublishedListItem({ article }: Readonly<ArticleUnpublishedListItemProps>) {
  const { id, title, topics, createdAt } = article;

  return (
    <div className="flex gap-2 p-4 border-b last:border-b-0">
      <div className="flex-1 space-y-1.5">
        <div className="flex gap-2">
          <h3 className="flex flex-wrap items-center gap-2">
            <SimpleTooltip content="비공개 아티클입니다.">
              <GlobeLockIcon className="size-4 text-muted-foreground" />
            </SimpleTooltip>
            <span className="line-clamp-2 font-medium">{title}</span>
          </h3>
          <ArticleUnpublishedActionMenu articleId={id} />
        </div>
        <div className="mt-0.5 flex flex-wrap gap-1">
          {topics.map((topic) => (
            <TopicLink key={topic.slug} topic={topic} />
          ))}
          <time className="ml-auto mt-auto text-xs text-muted-foreground font-medium">
            {parseRelativeTime(createdAt)} 생성
          </time>
        </div>
      </div>
    </div>
  );
}
