import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { MessageSquareMoreIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { postComment } from '~/apis/client/articles';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import { handleMessageError } from '~/lib/error';
import { articleCommentPostSchema } from '~/schemas/articles';

interface ArticleCommentFormProps {
  articleId: number;
}

export default function ArticleCommentForm({ articleId }: Readonly<ArticleCommentFormProps>) {
  const form = useForm<z.infer<typeof articleCommentPostSchema>>({
    resolver: zodResolver(articleCommentPostSchema),
    defaultValues: { content: '', articleId: articleId },
  });
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof articleCommentPostSchema>) {
    postComment(articleId, values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
        return queryClient.invalidateQueries({ queryKey: ['article-comments', articleId] });
      })
      .catch(handleMessageError);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" className="w-full">
          <MessageSquareMoreIcon /> 작성
        </Button>
      </form>
    </Form>
  );
}
