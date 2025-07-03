import { CloudUploadIcon, LetterTextIcon, XIcon } from 'lucide-react';
import { type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { editBookChapter } from '~/apis/client/books';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { IconInput } from '~/components/ui/icon-input';
import { handleMessageError } from '~/lib/error';
import { bookChapterEditSchema } from '~/schemas/book';

interface BookChapterEditFormProps {
  form: UseFormReturn<z.infer<typeof bookChapterEditSchema>>;
  bookId: number;
  chapterSequence: number;
}

export default function BookChapterEditForm({ form, bookId, chapterSequence }: Readonly<BookChapterEditFormProps>) {
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof bookChapterEditSchema>) {
    editBookChapter(bookId, chapterSequence, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
      })
      .catch(handleMessageError);
  }

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
        <FormField control={form.control} name="content" render={({ field }) => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <CloudUploadIcon /> 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
