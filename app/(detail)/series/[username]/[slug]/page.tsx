import { getSeriesDetail } from '@/apis/server/series';
import SeriesReviews from '@/components/client/series/review';
import { parseObject } from '@/lib/parse';
import { buildAssetsUrl } from '@/lib/utils';
import { compositeKeySchema } from '@/schemas/common';
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/series/[username]/[slug]'>): Promise<Metadata> {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);
  const [title, description] = [series.title, series.description.slice(0, 200).replace(/\n/g, ' ')];
  const url = `${process.env.WEB_HOST}/series/${username}/${slug}`;
  const images = [buildAssetsUrl(series.thumbnail)];
  return {
    title,
    description,
    openGraph: { title, description, url, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function SeriesDetailPage({ params }: PageProps<'/series/[username]/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const series = await getSeriesDetail(username, slug);

  return (
    <div className="w-full min-w-0 space-y-4">
      <SeriesReviews id={series.id} />
    </div>
  );
}
