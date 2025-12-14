import { TopicLink } from '@/components/client/topic';
import { UserLink } from '@/components/client/user';
import { Badge } from '@ui/badge';
import { InteractiveThumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';
import { MessagesSquareIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

interface SeriesListItemProps {
  series: Series;
}

export default function SeriesListItem({ series }: Readonly<SeriesListItemProps>) {
  const { slug, title, thumbnail, topics, writer, stats } = series;
  const href = `/series/${writer.username}/${slug}`;

  return (
    <div className="p-1 h-full flex flex-col gap-1.5">
      <Link href={href} prefetch={false} className="group space-y-1.5">
        <InteractiveThumbnail aspect={'3:4'} src={thumbnail} alt={`${title}-thumbnail`} width={640} height={360} />
        <h3 className="flex flex-wrap items-center">
          <span className="line-clamp-2 font-medium transition-colors group-hover:text-accent-foreground/50">
            {title}
          </span>
          <Badge variant={'muted'} className="px-1">
            <MessagesSquareIcon /> {stats.reviewCount}
          </Badge>
          <Badge variant={'muted'} className="px-1">
            <StarIcon /> {stats.starCount}
          </Badge>
        </h3>
      </Link>
      {topics.length > 0 && (
        <div className="mt-0.5 flex flex-wrap gap-1">
          {topics.map((topic) => (
            <TopicLink key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between gap-2">
        <UserLink {...writer} className="-ml-1.5" />
        <Timestamp {...series} />
      </div>
    </div>
  );
}
