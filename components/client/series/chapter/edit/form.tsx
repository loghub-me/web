'use client';

import { editSeriesChapter } from '@/apis/client/series';
import { PublishedFormField, TitleFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { seriesChapterEditSchema } from '@/schemas/series';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SeriesChapterEditFormProps {
  seriesId: number;
  chapterId: number;
  form: UseFormReturn<z.infer<typeof seriesChapterEditSchema>>;
}

export default function SeriesChapterEditForm({ seriesId, chapterId, form }: Readonly<SeriesChapterEditFormProps>) {
  const router = useRouter();
  const queryKeys = [['getSeriesForEdit', seriesId], ['getSeriesChapterForEdit', seriesId, chapterId] as const];
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof seriesChapterEditSchema>) {
    editSeriesChapter(seriesId, chapterId, values)
      .then(async ({ pathname, message }) => {
        toast.success(message);
        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
        router.push(pathname);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleFormField control={form.control} />
        <PublishedFormField control={form.control} />
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
