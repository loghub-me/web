'use client';

import { postSeries } from '@/apis/client/series';
import { TitleField, ThumbnailField, TopicSlugsField } from '@/components/client/field';
import { DEFAULT_SERIES_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { seriesPostSchema } from '@/schemas/series';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupAutoHeightTextarea, InputGroupText } from '@ui/input-group';
import { FolderPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SeriesPostFormProps {
  form: UseFormReturn<z.infer<typeof seriesPostSchema>>;
}

export default function SeriesPostForm({ form }: Readonly<SeriesPostFormProps>) {
  const router = useRouter();
  const [topicSlugs, setTopicSlugs] = useState(new Set<string>());

  async function onSubmit(values: z.infer<typeof seriesPostSchema>) {
    try {
      const { pathname, message } = await postSeries(values);
      toast.success(message);
      router.push(pathname);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  useEffect(() => {
    form.setValue('topicSlugs', [...topicSlugs]);
  }, [form, topicSlugs]);

  return (
    <form id="series-post-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <TitleField id="series-post-form-title" control={form.control} />
          <Controller
            name={'description'}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="series-post-form-description">설명</FieldLabel>
                <InputGroup>
                  <InputGroupAutoHeightTextarea
                    {...field}
                    id="series-post-form-description"
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
            id="series-post-form-topic-slugs"
            control={form.control}
            topicSlugs={topicSlugs}
            setTopicSlugs={setTopicSlugs}
          />
        </div>
        <ThumbnailField
          id="series-post-form-thumbnail"
          control={form.control}
          aspect={'3:4'}
          width={320}
          height={426}
          defaultValue={DEFAULT_SERIES_THUMBNAIL}
        />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <FolderPlusIcon /> 시리즈 만들기
        </Button>
      </div>
    </form>
  );
}
