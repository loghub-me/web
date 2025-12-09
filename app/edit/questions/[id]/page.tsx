'use client';

import { deleteQuestionDraft, getQuestionForEdit, updateQuestionDraft } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { QuestionEditDialog, QuestionEditForm } from '@/components/client/question';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { idSchema } from '@/schemas/common';
import { questionEditSchema } from '@/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import type EasyMDE from 'easymde';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
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

  return (
    <MarkdownEditor
      editor={{
        ref: easyMDERef,
        title: `[수정] ${question.title}`,
        defaultValue: resolvedContent,
      }}
      draft={{
        exists: Boolean(question.draft),
        queryKey,
        saveDraft: async (draft: string) => updateQuestionDraft(question.id, draft),
        deleteDraft: async () =>
          deleteQuestionDraft(question.id).then((res) => {
            easyMDERef.current?.value(question.content);
            form.setValue('content', question.content);
            return res;
          }),
      }}
    >
      <QuestionEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionEditForm id={question.id} form={form} />
      </QuestionEditDialog>
    </MarkdownEditor>
  );
}
