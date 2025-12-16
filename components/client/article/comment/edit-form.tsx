import { editArticleComment } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { articleCommentEditSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AutoHeightTextarea } from '@ui/auto-height-textarea';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { PencilIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface ArticleCommentEditFormProps {
  articleId: number;
  comment: ArticleComment;
  queryKeys: (string | number)[][];
  closeForm: () => void;
}

export default function ArticleCommentEditForm({
  articleId,
  comment,
  queryKeys,
  closeForm,
}: Readonly<ArticleCommentEditFormProps>) {
  const form = useForm<z.infer<typeof articleCommentEditSchema>>({
    resolver: zodResolver(articleCommentEditSchema),
    defaultValues: comment,
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof articleCommentEditSchema>) {
    editArticleComment(articleId, comment.id, values)
      .then(async ({ message }) => {
        toast.success(message);
        form.reset();

        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))).then(closeForm);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    session && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('mt-0.5 space-y-2')}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoHeightTextarea placeholder={`${parent ? '답글' : '댓글'}을 작성해주세요!`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-2">
            <Button type="submit" size={'sm'} disabled={form.formState.isSubmitting}>
              <PencilIcon /> 수정 완료
            </Button>
          </div>
        </form>
      </Form>
    )
  );
}
