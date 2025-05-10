import { Fragment } from 'react';
import { Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { cn } from '~/lib/utils';

interface TopicBadgeProps {
  topic: Topic;
  linkify?: boolean;
}

export default function TopicBadge({ topic, linkify = false }: Readonly<TopicBadgeProps>) {
  return (
    <Badge
      variant={'outline'}
      className={cn('h-7 rounded-sm p-1', linkify && 'transition-colors hover:bg-accent hover:cursor-pointer')}
      asChild={linkify}
    >
      {linkify ? (
        <Link to={`/topics/${topic.slug}`}>
          <Content topic={topic} />
        </Link>
      ) : (
        <Content topic={topic} />
      )}
    </Badge>
  );
}

function Content({ topic }: Readonly<TopicBadgeProps>) {
  return (
    <>
      <img className="size-4" src={`/icons/${topic.slug}.svg`} alt={topic.name} />
      <span>{topic.name}</span>
    </>
  );
}
