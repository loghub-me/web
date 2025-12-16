import { TopicLink } from '@/components/client/topic';
import { parseRelativeTime } from '@/lib/parse';
import { ButtonLink } from '@ui/button-link';
import { ChevronRightIcon, GlobeLockIcon, PencilIcon } from 'lucide-react';

interface ArticleUnpublishedListItemProps {
  article: ArticleUnpublished;
}

export default function ArticleUnpublishedListItem({ article }: Readonly<ArticleUnpublishedListItemProps>) {
  const { id, title, topics, createdAt } = article;

  return (
    <div className="flex gap-2 p-4 border-b last:border-b-0">
      <div className="flex-1 space-y-1.5">
        <div className="flex gap-2">
          <h3 className="flex flex-wrap items-center">
            <GlobeLockIcon className="mr-1 size-3.5 text-muted-foreground" />
            <span className="line-clamp-2 font-medium">{title}</span>
          </h3>
          <ButtonLink
            href={`/edit/articles/${id}`}
            variant={'outline'}
            size={'sm'}
            className="ml-auto has-[>svg]:pr-1.5"
          >
            <PencilIcon /> 수정하기 <ChevronRightIcon className="text-muted-foreground" />
          </ButtonLink>
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
