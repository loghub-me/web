'use client';

import { editArticle } from '@/apis/client/article';
import {
  PublishedFormField,
  ThumbnailFormField,
  TitleFormField,
  TopicSlugsFormField,
} from '@/components/client/form-field';
import { DEFAULT_ARTICLE_THUMBNAIL } from '@/constants/default-values';
import { handleFormError } from '@/lib/error';
import { articleEditSchema } from '@/schemas/article';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { DialogCloseButton } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleFormField control={form.control} />
        <ThumbnailFormField
          control={form.control}
          setValue={(value) => form.setValue('thumbnail', value)}
          aspect={'16:9'}
          width={640}
          height={360}
          defaultValue={DEFAULT_ARTICLE_THUMBNAIL}
        />
        <TopicSlugsFormField control={form.control} topicSlugs={topicSlugs} setTopicSlugs={setTopicSlugs} />
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
