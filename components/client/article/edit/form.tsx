'use client';

import { editArticle } from '@/apis/client/article';
import { TitleField, ThumbnailField, TopicSlugsField, PublishedField } from '@/components/client/field';
import { DEFAULT_ARTICLE_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { articleEditSchema } from '@/schemas/article';
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

interface ArticleEditFormProps {
  id: number;
  form: UseFormReturn<z.infer<typeof articleEditSchema>>;
}

export default function ArticleEditForm({ id: articleId, form }: Readonly<ArticleEditFormProps>) {
  const router = useRouter();
  const queryKey = ['getArticleForEdit', articleId] as const;
  const queryClient = useQueryClient();
  const [topicSlugs, setTopicSlugs] = useState(new Set(form.getValues('topicSlugs')));

  async function onSubmit(values: z.infer<typeof articleEditSchema>) {
    try {
      const { pathname, message } = await editArticle(articleId, values);
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
    <form id="article-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <TitleField id="article-edit-form-title" control={form.control} />
      <ThumbnailField
        id="article-edit-form-thumbnail"
        control={form.control}
        aspect={'16:9'}
        width={640}
        height={360}
        defaultValue={DEFAULT_ARTICLE_THUMBNAIL}
      />
      <TopicSlugsField
        id="article-edit-form-topic-slugs"
        control={form.control}
        topicSlugs={topicSlugs}
        setTopicSlugs={setTopicSlugs}
      />
      <PublishedField id="article-edit-form-published" control={form.control} />
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
