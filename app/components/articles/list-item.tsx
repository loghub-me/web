import { Link } from 'react-router';
import { TopicBadge } from '~/components/topics';
import { UserInline } from '~/components/users';
import { parseRelativeTime } from '~/lib/parse';

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: Readonly<ArticleListItemProps>) {
  const { slug, title, thumbnail, topics, createdAt, writerUsername } = article;
  const to = `/articles/@${writerUsername}/${slug}`;

  return (
    <Link to={to} className="h-full group flex flex-col gap-2 rounded-xl">
      <div className="aspect-video border rounded-lg bg-secondary overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          src={`${import.meta.env.VITE_BUCKET_HOST}/${thumbnail}`}
          alt={title}
        />
      </div>
      <h3 className="font-medium line-clamp-2">{title}</h3>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-2 justify-between">
        <UserInline username={writerUsername} />
        <span className="text-muted-foreground text-xs">{parseRelativeTime(createdAt)}</span>
      </div>
    </Link>
  );
}
