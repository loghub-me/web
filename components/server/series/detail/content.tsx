import { TopicLink } from '@/components/client/topic';
import { CardContent } from '@ui/card';
import { Thumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';

interface SeriesDetailContentProps {
  series: Pick<SeriesDetail, 'title' | 'description' | 'thumbnail' | 'topics' | 'createdAt' | 'updatedAt'>;
}

export default function SeriesDetailContent({ series }: Readonly<SeriesDetailContentProps>) {
  const { title, description, thumbnail, topics, createdAt, updatedAt } = series;

  return (
    <CardContent className="flex flex-row md:flex-col gap-4">
      <Thumbnail
        aspect={'3:4'}
        src={thumbnail}
        alt={`${title}-thumbnail`}
        width={320}
        height={426}
        className="w-40 sm:w-auto"
      />
      <div className="flex-1 space-y-1.5">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topics.map((topic) => (
              <TopicLink key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <p className="text-right">
          <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
        </p>
      </div>
    </CardContent>
  );
}
