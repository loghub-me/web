import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { CloudUploadIcon, LetterTextIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postAnswer } from '~/apis/client/question';
import { EasyMDEEditor } from '~/components/common/easymde';
import { Button } from '~/components/ui/button';
import { Card, CardFooter, CardHeader } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { IconInput } from '~/components/ui/icon-input';
import { UserAvatar } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';
import { questionAnswerPostSchema } from '~/schemas/question';

interface QuestionAnswerPostFormProps {
  questionId: number;
}

export default function QuestionAnswerPostForm({ questionId }: Readonly<QuestionAnswerPostFormProps>) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionAnswerPostSchema>>({
    resolver: zodResolver(questionAnswerPostSchema),
    defaultValues: { content: '' },
  });
  const hasError = form.formState.errors.content || form.formState.errors.title;

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.setValue('content', easyMDERef.current?.value() || '');
    form.handleSubmit(onSubmit)(e);
  }

  function onSubmit(values: z.infer<typeof questionAnswerPostSchema>) {
    postAnswer(questionId, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
        form.reset();
        easyMDERef.current?.value('');
      })
      .catch(handleMessageError);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit}>
        <Card className="gap-0 pb-0 overflow-hidden">
          <CardHeader className="flex items-center gap-2 pb-4 border-b">
            {session && <UserAvatar {...session} />}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <IconInput icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardHeader>
          <EasyMDEEditor title={'답변 작성'} ref={easyMDERef}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <CloudUploadIcon /> 게시하기
            </Button>
          </EasyMDEEditor>
          <CardFooter className={cn('space-y-2', hasError && 'border-t py-4')}>
            <FormField control={form.control} name="title" render={() => <FormMessage className="text-center" />} />
            <FormField control={form.control} name="content" render={() => <FormMessage className="text-center" />} />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
