import { data, useOutletContext } from 'react-router';
import { SeriesChapterDetailContent, SeriesChapterDetailFooter } from '~/components/series';
import { ErrorMessage } from '~/constants/error-messages';
import type { SeriesDetailLayoutContextProps } from '~/routes/users/series/layout';

export default function SeriesChapterDetailRoute() {
  const { series, chapter } = useOutletContext<SeriesDetailLayoutContextProps>();

  if (!chapter) {
    throw data(ErrorMessage.UNKNOWN, { status: 404 });
  }

  return (
    <div className="flex-1 flex flex-col p-6 min-w-0">
      <SeriesChapterDetailContent {...chapter} />
      <SeriesChapterDetailFooter
        seriesSlug={series.slug}
        writerUsername={series.writer.username}
        currentSequence={chapter.sequence}
        totalChapters={series.chapters.length}
      />
    </div>
  );
}
