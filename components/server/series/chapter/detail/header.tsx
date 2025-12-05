import { SeriesChapterEditLink } from '@/components/client/series';
import { SeriesChapterShareMenu } from '@/components/server/series';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface SeriesChapterDetailHeaderProps {
  series: Pick<Series, 'id' | 'slug' | 'writer'>;
  chapter: Pick<SeriesChapterDetail, 'id' | 'title' | 'sequence'>;
}

export default function SeriesChapterDetailHeader({ series, chapter }: Readonly<SeriesChapterDetailHeaderProps>) {
  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <h4 className="flex-1 text-lg font-semibold line-clamp-2">{chapter.title}</h4>
      <SeriesChapterShareMenu series={series} chapter={chapter} />
      <SeriesChapterEditLink series={series} chapterId={chapter.id} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
