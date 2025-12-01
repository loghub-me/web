import { SeriesActionMenu, SeriesStarToggle } from '@/components/client/series';
import { UserLink } from '@/components/client/user';
import { CardHeader } from '@ui/card';

interface SeriesDetailHeaderProps {
  series: Pick<SeriesDetail, 'id' | 'slug' | 'stats' | 'writer'>;
}

export default function SeriesDetailHeader({ series }: Readonly<SeriesDetailHeaderProps>) {
  const { stats, writer } = series;

  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <SeriesActionMenu series={series} />
      <SeriesStarToggle seriesId={series.id} starCount={stats.starCount} />
    </CardHeader>
  );
}
