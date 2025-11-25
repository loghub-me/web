'use client';

import { deleteQuestionDraft, getQuestionForEdit, updateQuestionDraft } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { QuestionEditDialog, QuestionEditForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { handleError } from '@/lib/error';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { idSchema } from '@/schemas/common';
import { questionEditSchema } from '@/schemas/question';
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

export default function QuestionEditPage() {
  const params = useParams<{ id: string }>();
  const { id } = parseObject(params, idSchema);
  const { status } = useAuth();

  const queryKey = ['getQuestionForEdit', id] as const;
  const { data: question, error } = useQuery({
    queryKey,
    queryFn: () => getQuestionForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/questions');

  return (
    <main className="max-h-screen h-screen pt-16">
      {question && <QuestionEditor question={question} queryKey={queryKey} />}
    </main>
  );
}

interface QuestionEditorProps {
  question: QuestionForEdit;
  queryKey: readonly [string, number];
}

function QuestionEditor({ question, queryKey }: Readonly<QuestionEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const queryClient = useQueryClient();
  const [hasDraft, setHasDraft] = useState(Boolean(question.draft));

  const resolvedContent = question.draft || question.content;

  const form = useForm<z.infer<typeof questionEditSchema>>({
    resolver: zodResolver(questionEditSchema),
    defaultValues: { ...question, content: resolvedContent },
  });

  const onDialogOpenChange = (open: boolean) => {
    if (!open) return;
    syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
      titleField: 'title',
      contentField: 'content',
    });
  };

  const onDraftSave = () => {
    if (!easyMDERef.current) return;
    const draft = easyMDERef.current.value();

    updateQuestionDraft(question.id, easyMDERef.current.value())
      .then(({ message }) => {
        toast.success(message, { icon: <SaveIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, (old) => (old ? { ...old, draft } : old));
        setHasDraft(true);
      })
      .catch(handleError);
  };

  const onDraftDelete = () => {
    if (!easyMDERef.current) return;

    deleteQuestionDraft(question.id)
      .then(({ message }) => {
        toast.success(message, { icon: <DeleteIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, { ...question, draft: null });
        easyMDERef.current?.value(question.content);
        form.setValue('content', question.content);
        setHasDraft(false);
      })
      .catch(handleError);
  };

  return (
    <MarkdownEditor
      title={`[수정] ${question.title}`}
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
      <QuestionEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionEditForm id={question.id} form={form} />
      </QuestionEditDialog>
    </MarkdownEditor>
  );
}
