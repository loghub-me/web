import { SeriesActionMenu, SeriesStarToggle } from '@/components/client/series';
import { TopicLink } from '@/components/client/topic';
import { UserLink } from '@/components/client/user';
import { Card, CardContent, CardHeader } from '@ui/card';
import { Thumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';

interface SeriesMetaCardProps {
  series: Pick<
    SeriesDetail,
    'id' | 'slug' | 'title' | 'thumbnail' | 'description' | 'createdAt' | 'updatedAt' | 'stats' | 'writer' | 'topics'
  >;
}

export default function SeriesMetaCard({ series }: Readonly<SeriesMetaCardProps>) {
  const { title, description, thumbnail, topics, stats, writer } = series;

  return (
    <Card className="pt-0">
      <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
        <UserLink {...writer} className={'mr-auto'} />
        <SeriesActionMenu series={series} />
        <SeriesStarToggle seriesId={series.id} starCount={stats.starCount} />
      </CardHeader>
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
            <Timestamp {...series} />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
