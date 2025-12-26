import { PageNav } from '@/components/client/page';
import { SeriesList, SeriesListItem } from '@/components/server/series';
import { seriesSearchSchema } from '@/schemas/series';
import ListEmpty from '@ui/list-empty';
import z from 'zod';

interface SeriesSearchResultProps {
  series: Promise<Page<Series>>;
  searchParams: z.infer<typeof seriesSearchSchema>;
}

export default async function SeriesSearchResult({ series, searchParams }: Readonly<SeriesSearchResultProps>) {
  const resolvedSeries = await series;

  return (
    <>
      <SeriesList>
        {resolvedSeries.content.length === 0 && <ListEmpty message={'검색된 시리즈가 없습니다.'} className="py-4" />}
        {resolvedSeries.content.map((series) => (
          <SeriesListItem key={series.id} series={series} />
        ))}
      </SeriesList>
      Series <PageNav currentPage={searchParams.page} totalPages={resolvedSeries.page.totalPages} />
    </>
  );
}
