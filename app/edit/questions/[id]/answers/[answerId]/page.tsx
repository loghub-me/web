'use client';

import { getQuestionAnswerForEdit } from '@/apis/client/question';
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
  const { data: answer, error } = useQuery({
    queryKey: ['getQuestionAnswerForEdit', questionId, answerId],
    queryFn: () => getQuestionAnswerForEdit(questionId, answerId),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/questions');

  return (
    <main className="max-h-screen h-screen pt-16">
      {answer && <QuestionAnswerEditor questionId={questionId} defaultValues={answer} />}
    </main>
  );
}

interface QuestionAnswerEditorProps {
  questionId: number;
  defaultValues: QuestionAnswerForEdit;
}

function QuestionAnswerEditor({ questionId, defaultValues }: Readonly<QuestionAnswerEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionAnswerEditSchema>>({
    resolver: zodResolver(questionAnswerEditSchema),
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
      <QuestionAnswerEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionAnswerEditForm questionId={questionId} answerId={defaultValues.id} form={form} />
      </QuestionAnswerEditDialog>
    </MarkdownEditor>
  );
}
