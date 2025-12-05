import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterTOCCard } from '@/components/client/series';
import {
  SeriesChapterDetailContent,
  SeriesChapterDetailFooter,
  SeriesChapterDetailHeader,
} from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesChapterDetailSchema } from '@/schemas/series';
import { Card } from '@ui/card';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps<'/series/[username]/[slug]/[sequence]'>): Promise<Metadata> {
  const { username, slug, sequence } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = await getSeriesChapterDetail(series.id, sequence);
  return {
    title: chapter.title,
    description: chapter.content.markdown.slice(0, 160).replace(/\n/g, ' '),
  };
}

export default async function SeriesChapterDetailPage({ params }: PageProps<'/series/[username]/[slug]/[sequence]'>) {
  const { username, slug, sequence } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = await getSeriesChapterDetail(series.id, sequence);

  return (
    <>
      <div className="w-full min-w-0 space-y-4">
        <Card className="pt-0">
          <SeriesChapterDetailHeader series={series} chapter={chapter} />
          <SeriesChapterDetailContent chapter={chapter} />
          <SeriesChapterDetailFooter
            series={series}
            chapterSequence={sequence}
            hasPrev={sequence > 1}
            hasNext={sequence < series.chapters.length}
          />
        </Card>
      </div>
      <aside className="sticky top-4 hidden lg:block max-w-xs w-full h-fit space-y-3">
        <SeriesChapterTOCCard chapter={chapter} />
      </aside>
    </>
  );
}
