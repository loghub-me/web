'use client';

import { editQuestionAnswer } from '@/apis/client/question';
import { TitleFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { questionAnswerEditSchema } from '@/schemas/question';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleFormField control={form.control} />
        <FormField control={form.control} name="content" render={() => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogCloseButton>취소하기</DialogCloseButton>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <PencilIcon /> 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
