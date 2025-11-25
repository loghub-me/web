'use client';

import { deleteQuestionAnswerDraft, getQuestionAnswerForEdit, updateQuestionAnswerDraft } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { QuestionAnswerEditDialog, QuestionAnswerEditForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { handleError } from '@/lib/error';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { questionAnswerEditPageSchema, questionAnswerEditSchema } from '@/schemas/question';
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

export default function QuestionAnswerEditPage() {
  const params = useParams<{ id: string; answerId: string }>();
  const { id: questionId, answerId } = parseObject(params, questionAnswerEditPageSchema);
  const { status } = useAuth();

  const queryKey = ['getQuestionAnswerForEdit', questionId, answerId] as const;
  const { data: answer, error } = useQuery({
    queryKey,
    queryFn: () => getQuestionAnswerForEdit(questionId, answerId),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/question');

  return (
    <main className="max-h-screen h-screen pt-16">
      {answer && <QuestionAnswerEditor questionId={questionId} answer={answer} queryKey={queryKey} />}
    </main>
  );
}

interface QuestionAnswerEditorProps {
  questionId: number;
  answer: QuestionAnswerForEdit;
  queryKey: readonly [string, number, number];
}

function QuestionAnswerEditor({ questionId, answer, queryKey }: Readonly<QuestionAnswerEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const queryClient = useQueryClient();
  const [hasDraft, setHasDraft] = useState(Boolean(answer.draft));

  const answerId = answer.id;
  const resolvedContent = answer.draft || answer.content;

  const form = useForm<z.infer<typeof questionAnswerEditSchema>>({
    resolver: zodResolver(questionAnswerEditSchema),
    defaultValues: { ...answer, content: resolvedContent },
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

    updateQuestionAnswerDraft(questionId, answerId, easyMDERef.current.value())
      .then(({ message }) => {
        toast.success(message, { icon: <SaveIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, { ...answer, draft });
        setHasDraft(true);
      })
      .catch(handleError);
  };

  const onDraftDelete = () => {
    if (!easyMDERef.current) return;

    deleteQuestionAnswerDraft(questionId, answerId)
      .then(({ message }) => {
        toast.success(message, { icon: <DeleteIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, { ...answer, draft: null });
        easyMDERef.current?.value(answer.content);
        form.setValue('content', answer.content);
        setHasDraft(false);
      })
      .catch(handleError);
  };

  return (
    <MarkdownEditor
      title={`[수정] ${answer.title}`}
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
      <QuestionAnswerEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionAnswerEditForm questionId={questionId} answerId={answer.id} form={form} />
      </QuestionAnswerEditDialog>
    </MarkdownEditor>
  );
}
