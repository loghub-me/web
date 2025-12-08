'use client';

import { postArticleComment } from '@/apis/client/article';
import { UserLink } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { articleCommentPostSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button, ButtonLink } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Textarea } from '@ui/textarea';
import { MessageSquareIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ArticleCommentFormProps {
  articleId: number;
  parent?: Pick<ArticleComment, 'id' | 'writer'>;
  queryKeys: (string | number)[][];
  closeForm?: () => void;
}

export default function ArticleCommentForm({
  articleId,
  parent,
  queryKeys,
  closeForm,
}: Readonly<ArticleCommentFormProps>) {
  const form = useForm<z.infer<typeof articleCommentPostSchema>>({
    resolver: zodResolver(articleCommentPostSchema),
    defaultValues: { content: '' },
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof articleCommentPostSchema>) {
    postArticleComment(articleId, values, parent?.id)
      .then(async ({ message }) => {
        toast.success(message);
        form.reset();
        closeForm?.();

        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  if (!session) {
    return (
      <p className="py-2 text-sm text-center text-muted-foreground">
        <ButtonLink href={'/login'} variant={'link'} className="p-0 h-fit">
          로그인
        </ButtonLink>{' '}
        후 댓글을 작성할 수 있습니다.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-3', parent && 'mt-2 rounded-md')}>
        <div className="flex items-center justify-between gap-2">
          <UserLink {...session} />
          <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
            <MessageSquareIcon /> 댓글 작성
          </Button>
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={`${parent ? '답글' : '댓글'}을 작성해주세요!`} {...field} autoHeight={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
