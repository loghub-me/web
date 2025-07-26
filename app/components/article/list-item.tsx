import { Link } from 'react-router';
import { ThumbnailImage } from '~/components/common/thumbnail/image';
import Timestamp from '~/components/common/timestamp';
import { TopicBadge } from '~/components/topic';
import { UserInline } from '~/components/user';

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: Readonly<ArticleListItemProps>) {
  const { slug, title, thumbnail, topics, writer } = article;
  const to = `/@${writer.username}/articles/${slug}`;

  return (
    <Link to={to} className="h-full group flex flex-col gap-2 rounded-xl">
      <ThumbnailImage src={thumbnail} alt={title} type={'article'} grouped={true} />
      <h3 className="font-medium line-clamp-2 group-hover:underline">{title}</h3>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-2 justify-between">
        <UserInline {...writer} />
        <Timestamp {...article} showUpdated={false} />
      </div>
    </Link>
  );
}
