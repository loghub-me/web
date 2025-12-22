import { editArticleComment } from '@/apis/client/article';
import { CommentContentField } from '@/components/client/field';
import { UserLink, UserMention } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { articleCommentEditSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { FieldError } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '@ui/input-group';
import { Separator } from '@ui/separator';
import { PencilIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
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
  const { mention } = comment;
  const form = useForm<z.infer<typeof articleCommentEditSchema>>({
    resolver: zodResolver(articleCommentEditSchema),
    defaultValues: comment,
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof articleCommentEditSchema>) {
    try {
      const { message } = await editArticleComment(articleId, comment.id, values);
      toast.success(message);
      form.reset();

      await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))).then(closeForm);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    session && (
      <form id="article-comment-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-0.5 space-y-2">
        <InputGroup>
          {mention && (
            <InputGroupAddon align="block-start" className="text-primary">
              <UserMention {...mention} />
            </InputGroupAddon>
          )}
          <CommentContentField
            id={'article-comment-edit-form-content'}
            control={form.control}
            isReply={Boolean(mention)}
          />
          <InputGroupAddon align="block-end">
            <UserLink {...session} className="-ml-1" />
            <Controller
              name={'content'}
              control={form.control}
              render={({ field }) => (
                <InputGroupText className="ml-auto">{field.value.length}/1024 자 입력</InputGroupText>
              )}
            />
            <Separator orientation="vertical" className="h-6 my-auto" />
            <Button type={'submit'} size={'icon-sm'} disabled={form.formState.isSubmitting}>
              <PencilIcon />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Controller
          name={'content'}
          control={form.control}
          render={({ fieldState }) => <FieldError errors={[fieldState.error]} />}
        />
      </form>
    )
  );
}
