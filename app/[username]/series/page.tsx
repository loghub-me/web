import { getUserSeries } from '@/apis/server/user';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesSearchResult, SeriesSearchSkeleton } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import { userDetailSchema } from '@/schemas/user';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: PageProps<'/[username]/series'>): Promise<Metadata> {
  const parsedParam = parseObject(await params, userDetailSchema);
  return {
    title: `@${parsedParam.username} - 시리즈`,
    description: `${parsedParam.username}님의 프로필 페이지입니다.`,
  };
}

export default async function UserSeriesSearchPage({ params, searchParams }: PageProps<'/[username]/series'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, seriesSearchSchema);
  const series = getUserSeries(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <SeriesSearchForm defaultValues={parsedSearchParams} action={`/${parsedParam.username}/series`} />
      <Suspense fallback={<SeriesSearchSkeleton />}>
        <SeriesSearchResult series={series} searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
