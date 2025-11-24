'use client';

import { getSeriesChapterForEdit } from '@/apis/client/series';
import { MarkdownEditor } from '@/components/client/markdown';
import { SeriesChapterEditDialog, SeriesChapterEditForm } from '@/components/client/series';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { seriesChapterEditPageSchema, seriesChapterEditSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import type EasyMDE from 'easymde';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SeriesChapterEditPage() {
  const params = useParams<{ id: string; sequence: string }>();
  const { id: seriesId, sequence } = parseObject(params, seriesChapterEditPageSchema);
  const { status } = useAuth();
  const { data: series, error } = useQuery({
    queryKey: ['getSeriesChapterForEdit', seriesId, sequence],
    queryFn: () => getSeriesChapterForEdit(seriesId, sequence),
    enabled: status === 'authenticated',
    retry: false,
    refetchOnMount: false,
  });

  useQueryErrorHandle(error, '/search/series');

  return (
    <main className="max-h-screen h-screen pt-16">
      {series && <SeriesChapterEditor seriesId={seriesId} defaultValues={series} />}
    </main>
  );
}

interface SeriesChapterEditorProps {
  seriesId: number;
  defaultValues: SeriesChapterForEdit;
}

function SeriesChapterEditor({ seriesId, defaultValues }: Readonly<SeriesChapterEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof seriesChapterEditSchema>>({
    resolver: zodResolver(seriesChapterEditSchema),
    defaultValues,
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
        titleField: 'title',
        contentField: 'content',
      });
    }
  }

  return (
    <MarkdownEditor title={`[수정] ${defaultValues.title}`} ref={easyMDERef} defaultValue={defaultValues.content}>
      <SeriesChapterEditDialog onOpenChange={onDialogOpenChange}>
        <SeriesChapterEditForm seriesId={seriesId} sequence={defaultValues.sequence} form={form} />
      </SeriesChapterEditDialog>
    </MarkdownEditor>
  );
}
