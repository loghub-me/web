'use client';

import { postArticleComment } from '@/apis/client/article';
import { CommentContentField } from '@/components/client/field';
import { UserLink, UserMention } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { articleCommentPostSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import { FieldError } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '@ui/input-group';
import { Separator } from '@ui/separator';
import { MessageSquareIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
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

  async function onSubmit(values: z.infer<typeof articleCommentPostSchema>) {
    try {
      const { message } = await postArticleComment(articleId, values, parent?.id);
      toast.success(message);
      form.reset();
      closeForm?.();

      await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
    } catch (err) {
      handleFormError(err, form.setError);
    }
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
    <form id="article-comment-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <InputGroup>
        {parent && (
          <InputGroupAddon align="block-start" className="text-primary">
            <UserMention {...parent.writer} />
          </InputGroupAddon>
        )}
        <CommentContentField id={'article-comment-form-content'} control={form.control} isReply={Boolean(parent)} />
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
            <MessageSquareIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Controller
        name={'content'}
        control={form.control}
        render={({ fieldState }) => <FieldError errors={[fieldState.error]} />}
      />
    </form>
  );
}
