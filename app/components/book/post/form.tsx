import { CloudUploadIcon, LetterTextIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postBook } from '~/apis/client/books';
import ThumbnailFormControl from '~/components/common/thumbnail/form-control';
import TopicSlugsFormControl from '~/components/common/topic/form-control';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { IconInput } from '~/components/ui/icon-input';
import { Textarea } from '~/components/ui/textarea';
import { handleMessageError } from '~/lib/error';
import { bookPostSchema } from '~/schemas/book';

interface BookPostFormProps {
  form: UseFormReturn<z.infer<typeof bookPostSchema>>;
}

export default function BookPostForm({ form }: Readonly<BookPostFormProps>) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);

  function onSubmit(values: z.infer<typeof bookPostSchema>) {
    postBook(values)
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea placeholder="설명을 입력해주세요" {...field} />
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
                aspect={'video'}
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
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CloudUploadIcon /> 등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
