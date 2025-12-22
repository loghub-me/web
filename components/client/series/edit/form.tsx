'use client';

import { editSeries } from '@/apis/client/series';
import { TitleField, ThumbnailField, TopicSlugsField } from '@/components/client/field';
import { DEFAULT_SERIES_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { seriesEditSchema } from '@/schemas/series';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupAutoHeightTextarea, InputGroupText } from '@ui/input-group';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
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
    <form id="series-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <TitleField id="series-edit-form-title" control={form.control} />
          <Controller
            name={'description'}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="series-edit-form-description">설명</FieldLabel>
                <InputGroup>
                  <InputGroupAutoHeightTextarea
                    {...field}
                    id="series-edit-form-description"
                    placeholder="시리즈에 대한 간단한 설명을 작성해주세요."
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="ml-auto">{field.value.length}/2048 자 입력</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <TopicSlugsField
            id="series-edit-form-topic-slugs"
            control={form.control}
            topicSlugs={topicSlugs}
            setTopicSlugs={setTopicSlugs}
          />
        </div>
        <ThumbnailField
          id="series-edit-form-thumbnail"
          control={form.control}
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
  );
}
