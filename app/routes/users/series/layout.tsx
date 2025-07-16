import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { getSeries, getSeriesChapter } from '~/apis/server/series';
import {
  SeriesChapterList,
  SeriesChapterListItem,
  SeriesDetailAside,
  SeriesDetailContent,
  SeriesDetailHeader,
} from '~/components/series';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { sequenceZod } from '~/schemas/zod';

export type SeriesDetailLayoutContextProps = { series: SeriesDetail; chapter?: SeriesChapterDetail };

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug, sequence } = parseParams(
    params,
    compositeKeySchema.extend({ sequence: sequenceZod.optional() })
  );
  const series = await getSeries(username, slug);

  if (sequence) {
    const chapter = await getSeriesChapter(series.id, sequence);
    return { series, chapter };
  }
  return { series };
}

export default function SeriesDetailLayout({ loaderData }: Route.ComponentProps) {
  const { series, chapter } = loaderData;
  const currentSequence = chapter?.sequence;

  return (
    <div className="pt-16 min-h-screen flex flex-col md:flex-row">
      <SeriesDetailAside>
        <SeriesDetailHeader {...series} />
        <SeriesDetailContent {...series} />
        <SeriesChapterList>
          {series.chapters.map((chapter) => (
            <SeriesChapterListItem
              key={chapter.sequence}
              {...series}
              chapter={chapter}
              currentSequence={currentSequence}
            />
          ))}
        </SeriesChapterList>
      </SeriesDetailAside>
      <Outlet context={{ series, chapter } satisfies SeriesDetailLayoutContextProps} />
    </div>
  );
}
