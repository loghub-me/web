import { CloudUploadIcon, LetterTextIcon, WandSparklesIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postArticle } from '~/apis/client/article';
import { ThumbnailFormControl } from '~/components/common/thumbnail/form-control';
import { TopicSlugsFormControl } from '~/components/common/topic/form-control';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { GlowButton } from '~/components/ui/glow-button';
import { IconInput } from '~/components/ui/icon-input';
import { handleFormError } from '~/lib/error';
import { articlePostSchema } from '~/schemas/article';

interface ArticlePostFormProps {
  form: UseFormReturn<z.infer<typeof articlePostSchema>>;
}

export default function ArticlePostForm({ form }: Readonly<ArticlePostFormProps>) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);

  function onSubmit(values: z.infer<typeof articlePostSchema>) {
    postArticle(values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  useEffect(() => {
    form.setValue(
      'topicSlugs',
      topics.map((topic) => topic.slug)
    );
  }, [topics]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <IconInput icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>썸네일</FormLabel>
              <ThumbnailFormControl
                type={'article'}
                value={field.value}
                setValue={(value) => form.setValue('thumbnail', value)}
              />
              <FormControl>
                <input type="hidden" placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TopicSlugsFormControl topics={topics} setTopics={setTopics} />
        <FormField control={form.control} name="content" render={({ field }) => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <GlowButton type="button" variant="outline">
            <WandSparklesIcon /> 자동완성
          </GlowButton>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CloudUploadIcon /> 게시하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
