'use client';

import { deleteSeriesChapterDraft, getSeriesChapterForEdit, updateSeriesChapterDraft } from '@/apis/client/series';
import { MarkdownEditor } from '@/components/client/markdown';
import { SeriesChapterEditDialog, SeriesChapterEditForm } from '@/components/client/series';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { handleError } from '@/lib/error';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { seriesChapterEditPageSchema, seriesChapterEditSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Kbd, KbdModifier } from '@ui/kbd';
import type EasyMDE from 'easymde';
import { DeleteIcon, SaveIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const queryClient = useQueryClient();
  const [hasDraft, setHasDraft] = useState(Boolean(chapter.draft));

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

  const onDraftSave = () => {
    if (!easyMDERef.current) return;
    const draft = easyMDERef.current.value();

    updateSeriesChapterDraft(seriesId, chapterId, easyMDERef.current.value())
      .then(({ message }) => {
        toast.success(message, { icon: <SaveIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, (old) => (old ? { ...old, draft } : old));
        setHasDraft(true);
      })
      .catch(handleError);
  };

  const onDraftDelete = () => {
    if (!easyMDERef.current) return;

    deleteSeriesChapterDraft(seriesId, chapterId)
      .then(({ message }) => {
        toast.success(message, { icon: <DeleteIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, { ...chapter, draft: null });
        easyMDERef.current?.value(chapter.content);
        form.setValue('content', chapter.content);
        setHasDraft(false);
      })
      .catch(handleError);
  };

  return (
    <MarkdownEditor
      title={`[수정] ${chapter.title}`}
      ref={easyMDERef}
      defaultValue={resolvedContent}
      onDraftSave={onDraftSave}
    >
      <ButtonGroup>
        <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onDraftSave}>
          <SaveIcon />
          <Kbd>
            <KbdModifier /> S
          </Kbd>
        </Button>
        {hasDraft && (
          <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onDraftDelete}>
            <DeleteIcon />
          </Button>
        )}
      </ButtonGroup>
      <SeriesChapterEditDialog onOpenChange={onDialogOpenChange}>
        <SeriesChapterEditForm seriesId={seriesId} chapterId={chapter.id} form={form} />
      </SeriesChapterEditDialog>
    </MarkdownEditor>
  );
}
