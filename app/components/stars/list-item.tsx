import { Link } from 'react-router';
import { TopicBadge } from '~/components/topics';
import { Badge } from '~/components/ui/badge';
import { UserInline } from '~/components/users';
import { parseRelativeTime } from '~/lib/parse';

interface StarListItemProps {
  star: Star;
}

export default function StarListItem({ star }: Readonly<StarListItemProps>) {
  const { path, title, writerUsername, topics, createdAt, targetLabel } = star;

  return (
    <Link to={path} className="flex flex-col gap-2 rounded-lg p-4 border transition-colors hover:bg-accent">
      <div className="flex items-start gap-2">
        <Badge variant="outline">{targetLabel}</Badge>
        <h3 className="font-medium line-clamp-2">{title}</h3>
      </div>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-2 justify-between">
        <UserInline username={writerUsername} />
        <span className="text-muted-foreground text-xs">{parseRelativeTime(createdAt)} 작성</span>
      </div>
    </Link>
  );
}
