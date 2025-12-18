'use client';

import { editSeries } from '@/apis/client/series';
import { ThumbnailFormField, TitleFormField, TopicSlugsFormField } from '@/components/client/form-field';
import { DEFAULT_SERIES_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { seriesEditSchema } from '@/schemas/series';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Textarea } from '@ui/textarea';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SeriesEditFormProps {
  id: number;
  form: UseFormReturn<z.infer<typeof seriesEditSchema>>;
}

export default function SeriesEditForm({ id: seriesId, form }: Readonly<SeriesEditFormProps>) {
  const router = useRouter();
  const queryKey = ['getSeriesForEdit', seriesId] as const;
  const queryClient = useQueryClient();
  const [topicSlugs, setTopicSlugs] = useState(new Set(form.getValues('topicSlugs')));

  async function onSubmit(values: z.infer<typeof seriesEditSchema>) {
    try {
      const { pathname, message } = await editSeries(seriesId, values);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <TitleFormField control={form.control} />
            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea className="h-32" placeholder="시리즈에 대한 간단한 설명을 작성해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TopicSlugsFormField control={form.control} topicSlugs={topicSlugs} setTopicSlugs={setTopicSlugs} />
          </div>
          <ThumbnailFormField
            control={form.control}
            setValue={(value) => form.setValue('thumbnail', value)}
            aspect={'3:4'}
            width={320}
            height={426}
            defaultValue={DEFAULT_SERIES_THUMBNAIL}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <PencilIcon /> 시리즈 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
