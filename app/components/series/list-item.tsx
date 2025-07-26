import { Link } from 'react-router';
import { ThumbnailImage } from '~/components/common/thumbnail/image';
import Timestamp from '~/components/common/timestamp';
import { TopicBadge } from '~/components/topic';
import { UserInline } from '~/components/user';

interface SeriesListItemProps {
  series: Series;
}

export default function SeriesListItem({ series }: Readonly<SeriesListItemProps>) {
  const { slug, title, thumbnail, topics, writer } = series;
  const to = `/@${writer.username}/series/${slug}`;

  return (
    <Link to={to} className="h-full group flex flex-col gap-2 rounded-xl">
      <ThumbnailImage src={thumbnail} alt={title} type={'series'} grouped={true} />
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
        <Timestamp {...series} showUpdated={false} />
      </div>
    </Link>
  );
}
