import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
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
  const chapter = getSeriesChapterDetail(series.id, sequence);

  return <SeriesChapterDetail series={series} chapter={chapter} totalChapters={series.chapters.length} />;
}

interface SeriesChapterDetailProps {
  series: Pick<SeriesDetail, 'id' | 'slug' | 'writer'>;
  chapter: Promise<SeriesChapterDetail>;
  totalChapters: number;
}

async function SeriesChapterDetail({ chapter, series, totalChapters }: Readonly<SeriesChapterDetailProps>) {
  const resolvedChapter = await chapter;
  const { sequence } = resolvedChapter;

  return (
    <Card className="pt-0">
      <SeriesChapterDetailHeader series={series} chapter={resolvedChapter} />
      <SeriesChapterDetailContent chapter={resolvedChapter} />
      <SeriesChapterDetailFooter
        series={series}
        chapterSequence={sequence}
        hasPrev={sequence > 1}
        hasNext={sequence < totalChapters}
      />
    </Card>
  );
}
