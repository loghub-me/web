import { TopicLink } from '@/components/client/topic';
import { UserLink } from '@/components/client/user';
import { USER_STAR_TARGET_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

interface StarListItemProps {
  star: UserStar;
}

export default function StarListItem({ star }: Readonly<StarListItemProps>) {
  const { slug, title, target, count, writer, topics } = star;
  const { path: targetPath, icon: TargetIcon } = USER_STAR_TARGET_OPTIONS[target];
  const href = `${targetPath}/${writer.username}/${slug}`;

  return (
    <div className="flex gap-2 p-4 border-b last:border-b-0">
      <TargetIcon className={cn('mt-1 size-4')} />
      <div className="flex-1 space-y-1.5">
        <h3 className="flex flex-wrap items-center">
          <Link
            href={href}
            prefetch={false}
            className="line-clamp-2 font-medium transition-colors hover:text-accent-foreground/50"
          >
            {title}
          </Link>
          <Badge variant="muted" className="px-1">
            <StarIcon /> {count}
          </Badge>
        </h3>
        {topics.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {topics.map((topic) => (
              <TopicLink key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2">
          <UserLink {...writer} className="-ml-1.5" />
        </div>
      </div>
    </div>
  );
}
