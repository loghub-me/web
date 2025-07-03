import { CloudUploadIcon, LetterTextIcon, WandSparklesIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { editArticle } from '~/apis/client/article';
import ThumbnailFormControl from '~/components/common/thumbnail/form-control';
import TopicSlugsFormControl from '~/components/common/topic/form-control';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { GlowButton } from '~/components/ui/glow-button';
import { IconInput } from '~/components/ui/icon-input';
import { getTopicBySlugs } from '~/constants/topics';
import { handleMessageError } from '~/lib/error';
import { articleEditSchema } from '~/schemas/article';

interface ArticleEditFormProps {
  form: UseFormReturn<z.infer<typeof articleEditSchema>>;
  id: number;
}

export default function ArticleEditForm({ form, id }: Readonly<ArticleEditFormProps>) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState(getTopicBySlugs(form.getValues('topicSlugs')));

  function onSubmit(values: z.infer<typeof articleEditSchema>) {
    editArticle(id, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch(handleMessageError);
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
              <ThumbnailFormControl value={field.value} setValue={(value) => form.setValue('thumbnail', value)} />
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
            <CloudUploadIcon /> 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
