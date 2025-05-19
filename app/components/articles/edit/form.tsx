import { CloudUploadIcon, LetterTextIcon, WandSparklesIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { editArticle } from '~/apis/client/articles';
import { ThumbnailFormControl, TopicSlugsFormControl } from '~/components/common/form-control';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { GlowButton } from '~/components/ui/glow-button';
import { IconInput } from '~/components/ui/icon-input';
import { getTopicBySlugs } from '~/constants/topics';
import { useImageUpload } from '~/hooks/use-image-upload';
import { handleMessageError } from '~/lib/error';
import { articlePostSchema } from '~/schemas/articles';

interface ArticleEditFormProps {
  form: UseFormReturn<z.infer<typeof articlePostSchema>>;
  id: number;
}

export default function ArticleEditForm({ form, id }: Readonly<ArticleEditFormProps>) {
  const navigate = useNavigate();
  const { inputRef, uploadedPath } = useImageUpload();
  const [topics, setTopics] = useState(getTopicBySlugs(form.getValues('topicSlugs')));

  function onSubmit(values: z.infer<typeof articlePostSchema>) {
    editArticle(id, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch(handleMessageError);
  }

  useEffect(() => {
    if (uploadedPath) {
      form.setValue('thumbnail', uploadedPath);
    }
  }, [uploadedPath]);

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
            <FormItem className="flex gap-2">
              <FormControl>
                <IconInput icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <GlowButton type="button" variant="outline" size="icon">
                <WandSparklesIcon />
              </GlowButton>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <ThumbnailFormControl inputRef={inputRef} value={field.value} />
              <FormControl>
                <input type="hidden" placeholder="제목을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TopicSlugsFormControl topics={topics} setTopics={setTopics} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit">
            <CloudUploadIcon /> 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
