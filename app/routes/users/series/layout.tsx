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
import zodFields from '~/schemas/fields';

export async function loader({ params }: Route.LoaderArgs) {
  const { sequence: sequenceZod } = zodFields;

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

  return (
    <main className="pt-16 min-h-screen flex flex-col md:flex-row bg-card">
      <SeriesDetailAside>
        <SeriesDetailHeader {...series} />
        <SeriesDetailContent {...series} />
        <SeriesChapterList>
          {series.chapters.map((chapter) => (
            <SeriesChapterListItem key={chapter.sequence} {...series} chapter={chapter} />
          ))}
        </SeriesChapterList>
      </SeriesDetailAside>
      <Outlet context={{ series, chapter } satisfies SeriesDetailLayoutContextProps} />
    </main>
  );
}
