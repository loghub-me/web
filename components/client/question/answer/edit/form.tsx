'use client';

import { editQuestionAnswer } from '@/apis/client/question';
import { TitleField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { questionAnswerEditSchema } from '@/schemas/question';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { FieldError } from '@ui/field';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionAnswerEditFormProps {
  questionId: number;
  answerId: number;
  form: UseFormReturn<z.infer<typeof questionAnswerEditSchema>>;
}

export default function QuestionAnswerEditForm({ questionId, answerId, form }: Readonly<QuestionAnswerEditFormProps>) {
  const router = useRouter();
  const queryKey = ['getQuestionAnswerForEdit', questionId, answerId] as const;
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof questionAnswerEditSchema>) {
    try {
      const { pathname, message } = await editQuestionAnswer(questionId, answerId, values);
      toast.success(message);

      await queryClient.invalidateQueries({ queryKey });
      router.push(pathname);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="question-answer-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <TitleField id="question-answer-edit-form-title" control={form.control} />
      <Controller
        control={form.control}
        name="content"
        render={({ fieldState }) => <FieldError errors={[fieldState.error]} />}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <DialogCloseButton>취소하기</DialogCloseButton>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <PencilIcon /> 수정하기
        </Button>
      </div>
    </form>
  );
}
