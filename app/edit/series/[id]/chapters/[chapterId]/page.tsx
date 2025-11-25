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
import { useQuery } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Kbd, KbdModifier } from '@ui/kbd';
import type EasyMDE from 'easymde';
import { DeleteIcon, SaveIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function SeriesChapterEditPage() {
  const params = useParams<{ id: string; chapterId: string }>();
  const { id: seriesId, chapterId } = parseObject(params, seriesChapterEditPageSchema);
  const { status } = useAuth();
  const { data: series, error } = useQuery({
    queryKey: ['getSeriesChapterForEdit', seriesId, chapterId],
    queryFn: () => getSeriesChapterForEdit(seriesId, chapterId),
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
  const [hasDraft, setHasDraft] = useState(Boolean(defaultValues.draft));

  const chapterId = defaultValues.id;
  const resolvedContent = defaultValues.draft || defaultValues.content;

  const form = useForm<z.infer<typeof seriesChapterEditSchema>>({
    resolver: zodResolver(seriesChapterEditSchema),
    defaultValues: { ...defaultValues, content: resolvedContent },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
        titleField: 'title',
        contentField: 'content',
      });
    }
  }

  const onDraftSave = useCallback(() => {
    if (!easyMDERef.current) return;

    updateSeriesChapterDraft(seriesId, chapterId, easyMDERef.current.value())
      .then(({ message }) => {
        toast.success(message);
        setHasDraft(true);
      })
      .catch(handleError);
  }, [seriesId, chapterId, easyMDERef]);

  const onDraftDelete = () => {
    if (!easyMDERef.current) return;

    deleteSeriesChapterDraft(seriesId, chapterId)
      .then(({ message }) => {
        toast.success(message);
        easyMDERef.current?.value(defaultValues.content);
        form.setValue('content', defaultValues.content);
        setHasDraft(false);
      })
      .catch(handleError);
  };

  return (
    <MarkdownEditor
      title={`[수정] ${defaultValues.title}`}
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
        <SeriesChapterEditForm seriesId={seriesId} chapterId={defaultValues.id} form={form} />
      </SeriesChapterEditDialog>
    </MarkdownEditor>
  );
}
