import { getUserSeries } from '@/apis/server/user';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesSearchResult, SeriesSearchSkeleton } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import { userDetailSchema } from '@/schemas/user';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: PageProps<'/[username]/series'>): Promise<Metadata> {
  const { username } = parseObject(await params, userDetailSchema);
  const [title, description] = [`@${username} - 시리즈`, `${username}님의 시리즈 목록 페이지입니다.`];
  const url = `${process.env.WEB_HOST}/${username}/series`;
  return {
    title,
    description,
    openGraph: { title, description, url },
    twitter: { card: 'summary', title, description },
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
