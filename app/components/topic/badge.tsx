import { Fragment } from 'react';
import { Link } from 'react-router';
import { TopicImage } from '~/components/topic';
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
      className={cn('h-7 rounded-sm p-1 bg-card', linkify && 'transition-colors hover:bg-accent cursor-pointer')}
      asChild={linkify}
    >
      {linkify ? (
        <Link to={`/topics/${topic.slug}`}>
          <TopicImage topic={topic} /> {topic.name}
        </Link>
      ) : (
        <>
          <TopicImage topic={topic} /> {topic.name}
        </>
      )}
    </Badge>
  );
}
