'use client';

import { deleteSeriesChapterDraft, getSeriesChapterForEdit, updateSeriesChapterDraft } from '@/apis/client/series';
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
  const params = useParams<{ id: string; chapterId: string }>();
  const { id: seriesId, chapterId } = parseObject(params, seriesChapterEditPageSchema);
  const { status } = useAuth();

  const queryKey = ['getSeriesChapterForEdit', seriesId, chapterId] as const;
  const { data: chapter, error } = useQuery({
    queryKey,
    queryFn: () => getSeriesChapterForEdit(seriesId, chapterId),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/series');

  return (
    <main className="max-h-screen h-screen pt-16">
      {chapter && <SeriesChapterEditor seriesId={seriesId} chapter={chapter} queryKey={queryKey} />}
    </main>
  );
}

interface SeriesChapterEditorProps {
  seriesId: number;
  chapter: SeriesChapterForEdit;
  queryKey: readonly [string, number, number];
}

function SeriesChapterEditor({ seriesId, chapter, queryKey }: Readonly<SeriesChapterEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const chapterId = chapter.id;
  const resolvedContent = chapter.draft || chapter.content;
  const form = useForm<z.infer<typeof seriesChapterEditSchema>>({
    resolver: zodResolver(seriesChapterEditSchema),
    defaultValues: { ...chapter, content: resolvedContent },
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
    <MarkdownEditor
      editor={{
        ref: easyMDERef,
        title: `[수정] ${chapter.title}`,
        defaultValue: resolvedContent,
      }}
      draft={{
        exists: Boolean(chapter.draft),
        queryKey,
        saveDraft: async (draft: string) => updateSeriesChapterDraft(seriesId, chapterId, draft),
        deleteDraft: async () =>
          deleteSeriesChapterDraft(seriesId, chapterId).then((res) => {
            easyMDERef.current?.value(chapter.content);
            form.setValue('content', chapter.content);
            return res;
          }),
      }}
    >
      <SeriesChapterEditDialog onOpenChange={onDialogOpenChange}>
        <SeriesChapterEditForm seriesId={seriesId} chapterId={chapter.id} form={form} />
      </SeriesChapterEditDialog>
    </MarkdownEditor>
  );
}
