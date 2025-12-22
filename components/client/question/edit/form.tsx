'use client';

import { editQuestion } from '@/apis/client/question';
import { TitleField, TopicSlugsField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { questionEditSchema } from '@/schemas/question';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { FieldError } from '@ui/field';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionEditFormProps {
  id: number;
  form: UseFormReturn<z.infer<typeof questionEditSchema>>;
}

export default function QuestionEditForm({ id: questionId, form }: Readonly<QuestionEditFormProps>) {
  const router = useRouter();
  const queryKey = ['getQuestionForEdit', questionId] as const;
  const queryClient = useQueryClient();
  const [topicSlugs, setTopicSlugs] = useState(new Set(form.getValues('topicSlugs')));

  async function onSubmit(values: z.infer<typeof questionEditSchema>) {
    try {
      const { pathname, message } = await editQuestion(questionId, values);
      toast.success(message);

      await queryClient.invalidateQueries({ queryKey });
      router.push(pathname);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  useEffect(() => {
    form.setValue('topicSlugs', [...topicSlugs]);
  }, [form, topicSlugs]);

  return (
    <form id="question-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <TitleField id="question-edit-form-title" control={form.control} />
      <TopicSlugsField
        id="question-edit-form-topic-slugs"
        control={form.control}
        topicSlugs={topicSlugs}
        setTopicSlugs={setTopicSlugs}
      />
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
