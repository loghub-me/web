import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getSeries } from '~/apis/server/series';
import {
  SeriesChapterAddButton,
  SeriesChapterEditList,
  SeriesChapterEditListItem,
  SeriesEditForm,
} from '~/components/series';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { seriesPostSchema } from '~/schemas/series';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const series = await getSeries(username, slug);
  return { series };
}

export default function EditSeriesRoute({ loaderData }: Route.ComponentProps) {
  const { series } = loaderData;
  const form = useForm<z.infer<typeof seriesPostSchema>>({
    resolver: zodResolver(seriesPostSchema),
    defaultValues: { ...series, topicSlugs: series.topics.map((topic) => topic.slug) },
  });

  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen space-y-4 flex flex-col md:flex-row gap-4">
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">시리즈 수정</h2>
          <p className="text-sm text-secondary-foreground">시리즈를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <SeriesEditForm form={form} id={series.id} />
      </div>
      <hr />
      <div className="mt-4 md:mt-16 mx-auto max-w-md w-full">
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">챕터 수정</h2>
          <p className="text-sm text-secondary-foreground">챕터를 수정하려면 아래 양식을 작성해주세요.</p>
        </div>
        <SeriesChapterEditList>
          {series.chapters.map((chapter) => (
            <SeriesChapterEditListItem key={chapter.sequence} chapter={chapter} {...series} />
          ))}
          <SeriesChapterAddButton seriesId={series.id} />
        </SeriesChapterEditList>
      </div>
    </main>
  );
}
