import { getSeriesChapterDetail, getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterTOCCard } from '@/components/client/series';
import {
  SeriesChapterDetailContent,
  SeriesChapterDetailFooter,
  SeriesChapterDetailHeader,
} from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { buildAssetsUrl } from '@/lib/utils';
import { seriesChapterDetailSchema } from '@/schemas/series';
import { Card } from '@ui/card';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps<'/series/[username]/[slug]/[sequence]'>): Promise<Metadata> {
  const { username, slug, sequence } = parseObject(await params, seriesChapterDetailSchema);
  const series = await getSeriesDetail(username, slug);
  const chapter = await getSeriesChapterDetail(series.id, sequence);
  const [title, description] = [chapter.title, chapter.content.markdown.slice(0, 160).replace(/\n/g, ' ')];
  const images = [buildAssetsUrl(series.thumbnail)];
  const url = `${process.env.WEB_HOST}/series/${username}/${slug}/${sequence}`;
  return {
    title,
    description,
    openGraph: { title, description, url, images },
    twitter: { card: 'summary_large_image', title, description, images },
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
            chapter={chapter}
            hasPrev={sequence > 1}
            hasNext={sequence < series.chapters.length}
          />
        </Card>
      </div>
      <aside className="sticky top-4 hidden xl:block max-w-xs w-full h-fit space-y-3">
        <SeriesChapterTOCCard chapter={chapter} />
      </aside>
    </>
  );
}
