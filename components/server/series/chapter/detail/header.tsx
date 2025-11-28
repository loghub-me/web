import { SeriesChapterEditLink, SeriesChapterTOCMenu } from '@/components/client/series';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface SeriesChapterDetailHeaderProps {
  series: Pick<Series, 'id' | 'writer'>;
  chapter: Pick<SeriesChapterDetail, 'id' | 'title' | 'anchors'>;
}

export default function SeriesChapterDetailHeader({ series, chapter }: Readonly<SeriesChapterDetailHeaderProps>) {
  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <h4 className="flex-1 text-lg font-semibold line-clamp-2">{chapter.title}</h4>
      <SeriesChapterEditLink series={series} chapter={chapter} />
      <SeriesChapterTOCMenu anchors={chapter.anchors} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
