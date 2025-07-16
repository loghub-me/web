import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getSeries, getSeriesChapter } from '~/apis/server/series';
import { EasyMDEEditor } from '~/components/common/easymde';
import { SeriesChapterEditDialog, SeriesChapterEditForm } from '~/components/series';
import AuthGuard from '~/guards/auth-guard';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { seriesChapterEditSchema } from '~/schemas/series';
import { sequenceZod } from '~/schemas/zod';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug, sequence } = parseParams(params, compositeKeySchema.extend({ sequence: sequenceZod }));
  const series = await getSeries(username, slug);
  const chapter = await getSeriesChapter(series.id, sequence);
  return { series, chapter };
}

export default function SeriesChapterEditRoute({ loaderData }: Route.ComponentProps) {
  const { series, chapter } = loaderData;
  const { title, content, sequence } = chapter;

  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof seriesChapterEditSchema>>({
    resolver: zodResolver(seriesChapterEditSchema),
    defaultValues: { title, content: content.markdown },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <AuthGuard>
      <main className="max-h-screen h-screen pt-16">
        <EasyMDEEditor title="챕터 수정" ref={easyMDERef} defaultValue={content.markdown}>
          <SeriesChapterEditDialog onOpenChange={onDialogOpenChange}>
            <SeriesChapterEditForm form={form} seriesId={series.id} chapterSequence={sequence} />
          </SeriesChapterEditDialog>
        </EasyMDEEditor>
      </main>
    </AuthGuard>
  );
}
