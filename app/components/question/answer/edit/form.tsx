import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { LetterTextIcon, PencilIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { editAnswer } from '~/apis/client/question';
import { EasyMDEEditor } from '~/components/common/easymde';
import { Button } from '~/components/ui/button';
import { Card, CardFooter, CardHeader } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { IconInput } from '~/components/ui/icon-input';
import { UserAvatar } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';
import { answerPostSchema } from '~/schemas/question';

interface QuestionAnswerEditFormProps {
  question: { id: number };
  answer: {
    id: number;
    title: string;
    content: { markdown: string };
  };
  closeEditForm: () => void;
}

export default function QuestionAnswerEditForm({
  question,
  answer,
  closeEditForm,
}: Readonly<QuestionAnswerEditFormProps>) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof answerPostSchema>>({
    resolver: zodResolver(answerPostSchema),
    defaultValues: { title: answer.title, content: answer.content.markdown },
  });
  const hasError = form.formState.errors.content || form.formState.errors.title;

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.setValue('content', easyMDERef.current?.value() || '');
    form.handleSubmit(onSubmit)(e);
  }

  function onSubmit(values: z.infer<typeof answerPostSchema>) {
    editAnswer(question.id, answer.id, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        navigate(pathname);
        form.reset();
        easyMDERef.current?.cleanup();
        closeEditForm();
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
            <Button type={'button'} variant={'ghost'} size={'icon'} onClick={closeEditForm}>
              <XIcon />
            </Button>
          </CardHeader>
          <EasyMDEEditor title={`'${answer.title}' 수정`} ref={easyMDERef} defaultValue={answer.content.markdown}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <PencilIcon /> 수정하기
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
