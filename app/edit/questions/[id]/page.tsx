'use client';

import { getQuestionForEdit } from '@/apis/client/question';
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
  const { data: question, error } = useQuery({
    queryKey: ['getQuestionForEdit', id],
    queryFn: () => getQuestionForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/questions');

  return <main className="max-h-screen h-screen pt-16">{question && <QuestionEditor defaultValues={question} />}</main>;
}

interface QuestionEditorProps {
  defaultValues: QuestionForEdit;
}

function QuestionEditor({ defaultValues }: Readonly<QuestionEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionEditSchema>>({
    resolver: zodResolver(questionEditSchema),
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
      <QuestionEditDialog onOpenChange={onDialogOpenChange}>
        <QuestionEditForm id={defaultValues.id} form={form} />
      </QuestionEditDialog>
    </MarkdownEditor>
  );
}
