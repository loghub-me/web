import { getTopicSeries } from '@/apis/server/topic';
import { PageNav } from '@/components/client/page';
import { TopicSeriesSort } from '@/components/client/topic';
import { SeriesSearchSkeleton, SeriesList, SeriesListItem } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema, topicSeriesSearchParams } from '@/schemas/topic';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';
import z from 'zod';

export default async function TopicSeriesPage({ params, searchParams }: PageProps<'/topics/[slug]/series'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, topicSeriesSearchParams);
  const series = getTopicSeries(parsedParam.slug, parsedSearchParams);

  return (
    <main className="space-y-4">
      <TopicSeriesSort slug={parsedParam.slug} searchParams={parsedSearchParams} />
      <Suspense fallback={<SeriesSearchSkeleton />}>
        <TopicSeriesResult series={series} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}

interface TopicSeriesResultProps {
  series: Promise<Page<Series>>;
  searchParams: z.infer<typeof topicSeriesSearchParams>;
}

async function TopicSeriesResult({ series, searchParams }: Readonly<TopicSeriesResultProps>) {
  const resolvedSeries = await series;

  return (
    <>
      <SeriesList>
        {resolvedSeries.content.length === 0 && <ListEmpty message={'검색된 시리즈가 없습니다.'} className="py-4" />}
        {resolvedSeries.content.map((series) => (
          <SeriesListItem key={series.id} series={series} />
        ))}
      </SeriesList>
      <PageNav currentPage={searchParams.page} totalPages={resolvedSeries.page.totalPages} />
    </>
  );
}
