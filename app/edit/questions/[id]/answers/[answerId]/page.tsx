'use client';

import { deleteQuestionAnswerDraft, getQuestionAnswerForEdit, updateQuestionAnswerDraft } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { QuestionAnswerEditDialog, QuestionAnswerEditForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { questionAnswerEditPageSchema, questionAnswerEditSchema } from '@/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import type EasyMDE from 'easymde';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
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

  return (
    <MarkdownEditor
      editor={{
        ref: easyMDERef,
        title: `[수정] ${answer.title}`,
        defaultValue: resolvedContent,
      }}
      draft={{
        exists: Boolean(answer.draft),
        queryKey,
        saveDraft: async (draft: string) => updateQuestionAnswerDraft(questionId, answerId, draft),
        deleteDraft: async () =>
          deleteQuestionAnswerDraft(questionId, answerId).then((res) => {
            easyMDERef.current?.value(answer.content);
            form.setValue('content', answer.content);
            return res;
          }),
      }}
    >
      <QuestionAnswerEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionAnswerEditForm questionId={questionId} answerId={answer.id} form={form} />
      </QuestionAnswerEditDialog>
    </MarkdownEditor>
  );
}
