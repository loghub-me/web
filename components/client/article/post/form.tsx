'use client';

import { postArticle } from '@/apis/client/article';
import { TitleField, ThumbnailField, TopicSlugsField, PublishedField } from '@/components/client/field';
import { DEFAULT_ARTICLE_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { articlePostSchema } from '@/schemas/article';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { FieldError } from '@ui/field';
import { UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ArticlePostFormProps {
  form: UseFormReturn<z.infer<typeof articlePostSchema>>;
}

export default function ArticlePostForm({ form }: Readonly<ArticlePostFormProps>) {
  const router = useRouter();
  const [topicSlugs, setTopicSlugs] = useState(new Set<string>());

  async function onSubmit(values: z.infer<typeof articlePostSchema>) {
    try {
      const { pathname, message } = await postArticle(values);
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
    <form id="article-post-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <TitleField id="article-post-form-title" control={form.control} />
      <ThumbnailField
        id="article-post-form-thumbnail"
        control={form.control}
        aspect={'16:9'}
        width={640}
        height={360}
        defaultValue={DEFAULT_ARTICLE_THUMBNAIL}
      />
      <TopicSlugsField
        id="article-post-form-topic-slugs"
        control={form.control}
        topicSlugs={topicSlugs}
        setTopicSlugs={setTopicSlugs}
      />
      <PublishedField id="article-post-form-published" control={form.control} />
      <Controller
        control={form.control}
        name="content"
        render={({ fieldState }) => <FieldError errors={[fieldState.error]} />}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <DialogCloseButton>취소하기</DialogCloseButton>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <UploadIcon /> 게시하기
        </Button>
      </div>
    </form>
  );
}
