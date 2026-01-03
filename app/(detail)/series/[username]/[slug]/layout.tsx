import { getSeriesDetail } from '@/apis/server/series';
import { SeriesChapterCard } from '@/components/client/series';
import { SeriesAsideLeft, SeriesMetaCard } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';

export default async function SeriesDetailLayout({ params, children }: LayoutProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return (
    <main className="container mx-auto py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesAsideLeft>
          <SeriesMetaCard series={series} />
          <div className="sticky top-4 h-fit">
            <SeriesChapterCard series={series} />
          </div>
        </SeriesAsideLeft>
        {children}
      </div>
    </main>
  );
}
