import { Link } from 'react-router';
import Timestamp from '~/components/common/timestamp';
import { TopicBadge } from '~/components/topic';
import { UserInline } from '~/components/user';

interface SeriesListItemProps {
  series: Series;
}

export default function SeriesListItem({ series }: Readonly<SeriesListItemProps>) {
  const { slug, title, thumbnail, topics, writerUsername } = series;
  const to = `/@${writerUsername}/series/${slug}`;

  return (
    <Link to={to} className="h-full group flex flex-col gap-2 rounded-xl">
      <div className="aspect-series border rounded-lg bg-secondary overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          src={`${import.meta.env.VITE_BUCKET_HOST}/${thumbnail}`}
          alt={title}
        />
      </div>
      <h3 className="font-medium line-clamp-2 group-hover:underline">{title}</h3>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-2 justify-between">
        <UserInline username={writerUsername} />
        <Timestamp {...series} showUpdated={false} />
      </div>
    </Link>
  );
}
