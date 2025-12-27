import { getSeries } from '@/apis/server/series';
import { SeriesSearchForm } from '@/components/client/series';
import { SeriesSearchSkeleton, SeriesSearchResult } from '@/components/server/series';
import { parseObject } from '@/lib/parse';
import { seriesSearchSchema } from '@/schemas/series';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = '시리즈 검색';
const description = '시리즈는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/search/series` },
  twitter: { card: 'summary', title, description },
};

export default async function SeriesSearchPage({ searchParams }: PageProps<'/search/series'>) {
  const parsedSearchParams = parseObject(await searchParams, seriesSearchSchema);
  const series = getSeries(parsedSearchParams);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <SeriesSearchForm defaultValues={parsedSearchParams} />
      <Suspense fallback={<SeriesSearchSkeleton />}>
        <SeriesSearchResult series={series} searchParams={parsedSearchParams} />
      </Suspense>
    </main>
  );
}
