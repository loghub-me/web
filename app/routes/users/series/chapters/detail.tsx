import { data, useOutletContext } from 'react-router';
import { SeriesChapterDetailContent, SeriesChapterDetailFooter } from '~/components/series';
import { Card } from '~/components/ui/card';
import { ErrorMessage } from '~/constants/error-messages';
import type { SeriesDetailLayoutContextProps } from '~/routes/users/series/layout';

export default function SeriesChapterDetailRoute() {
  const { series, chapter } = useOutletContext<SeriesDetailLayoutContextProps>();

  if (!chapter) {
    throw data(ErrorMessage.UNKNOWN, { status: 404 });
  }

  return (
    <main className="p-4 w-full">
      <Card className="h-fit">
        <SeriesChapterDetailContent {...chapter} />
        <SeriesChapterDetailFooter
          seriesSlug={series.slug}
          writerUsername={series.writer.username}
          currentSequence={chapter.sequence}
          totalChapters={series.chapters.length}
        />
      </Card>
    </main>
  );
}
