import type { Route } from './+types/detail';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useOutletContext } from 'react-router';
import { getSeriesReviews } from '~/apis/client/series';
import { CommentSkeleton as ReviewSkeleton } from '~/components/common/skeletons';
import PageNav from '~/components/search/page-nav';
import { SeriesReviewForm, SeriesReviewList, SeriesReviewListItem } from '~/components/series';
import { parseSearchParams } from '~/lib/parse';
import { seriesReviewPageSchema } from '~/schemas/series';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { reviewPage } = parseSearchParams(url.searchParams, seriesReviewPageSchema);
  return { reviewPage };
}

export default function SeriesDetailRoute({ loaderData }: Route.ComponentProps) {
  const { reviewPage } = loaderData;
  const { series } = useOutletContext<{ series: SeriesDetail }>();

  return (
    <main className="p-4 w-full">
      <SeriesDetailComments seriesId={series.id} currentPage={reviewPage} />
    </main>
  );
}

interface SeriesDetailCommentsProps {
  seriesId: number;
  currentPage: number;
}

function SeriesDetailComments({ seriesId, currentPage }: Readonly<SeriesDetailCommentsProps>) {
  const queryKey = ['getSeriesReviews', seriesId, currentPage];
  const { data: reviews, status } = useQuery({ queryKey, queryFn: () => getSeriesReviews(seriesId, currentPage) });
  const { pathname } = useLocation();

  return (
    <div className="space-y-4">
      <div className="border-b">
        <SeriesReviewForm seriesId={seriesId} queryKey={queryKey} />
      </div>
      <div className="space-y-2">
        <SeriesReviewList>
          {status === 'pending' && <ReviewSkeleton size={2} />}
          {reviews?.page.totalPages === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
            </p>
          )}
          {reviews?.content.map((review) => (
            <SeriesReviewListItem key={review.id} seriesId={seriesId} review={review} queryKey={queryKey} />
          ))}
        </SeriesReviewList>
        {reviews && (
          <PageNav to={`${pathname}?reviewPage=`} currentPage={currentPage} totalPages={reviews?.page.totalPages} />
        )}
      </div>
    </div>
  );
}
