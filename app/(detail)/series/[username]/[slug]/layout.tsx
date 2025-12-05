import { getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import { SeriesDetailContent, SeriesDetailHeader } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';

export default async function SeriesDetailLayout({ params, children }: LayoutProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="md:max-w-xs w-full space-y-4">
          <Card className="pt-0">
            <SeriesDetailHeader series={series} />
            <SeriesDetailContent series={series} />
          </Card>
          <div className="sticky top-4 h-fit">
            <SeriesChapterCard series={series} />
          </div>
        </aside>
        {children}
      </div>
    </main>
  );
}
