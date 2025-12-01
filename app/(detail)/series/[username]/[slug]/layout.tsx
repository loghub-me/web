import { getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import { SeriesDetailAside, SeriesDetailContent, SeriesDetailHeader } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';

export default async function SeriesDetailLayout({ params, children }: LayoutProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesDetailAside>
          <Card className="pt-0">
            <SeriesDetailHeader series={series} />
            <SeriesDetailContent series={series} />
          </Card>
          <SeriesChapterCard writerUsername={username} slug={slug} chapters={series.chapters} />
        </SeriesDetailAside>
        <div className="w-full min-w-0 space-y-4">{children}</div>
      </div>
    </main>
  );
}
