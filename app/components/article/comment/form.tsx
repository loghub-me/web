import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRightIcon, MessageSquareMoreIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { postArticleComment } from '~/apis/client/article';
import { Button, ButtonLink } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import { UserInline, UserLink } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { useReply } from '~/hooks/use-reply';
import { handleFormError } from '~/lib/error';
import { articleCommentPostSchema } from '~/schemas/article';

interface ArticleCommentFormProps {
  articleId: number;
  queryKey: (string | number)[];
}

export default function ArticleCommentForm({ articleId, queryKey }: Readonly<ArticleCommentFormProps>) {
  const form = useForm<z.infer<typeof articleCommentPostSchema>>({
    resolver: zodResolver(articleCommentPostSchema),
    defaultValues: { content: '', articleId: articleId },
  });
  const { session } = useAuth();
  const { replyTo, parentId, clear } = useReply();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof articleCommentPostSchema>) {
    postArticleComment(articleId, values, parentId)
      .then(({ message }) => {
        toast.success(message);

        form.reset();
        if (replyTo) clear();

        if (parentId) {
          queryClient.invalidateQueries({ queryKey: ['getArticleCommentReplies', articleId, parentId] });
        }
        queryClient.invalidateQueries({ queryKey });
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  if (!session) {
    return (
      <p className="py-4 text-sm text-center text-muted-foreground">
        <ButtonLink to={'/login'} variant={'link'} className="p-0 h-fit">
          로그인
        </ButtonLink>{' '}
        후 댓글을 작성할 수 있습니다.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-2">
          <UserLink {...session} />
          {replyTo && (
            <Button type="button" variant="outline" onClick={() => clear()}>
              <ChevronRightIcon className="size-3" />
              <UserInline {...replyTo.writer} />
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="댓글을 작성해주세요!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <MessageSquareMoreIcon /> 작성
        </Button>
      </form>
    </Form>
  );
}
