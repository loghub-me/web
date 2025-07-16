import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { CloudUploadIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postAnswer } from '~/apis/client/question';
import { EasyMDEEditor } from '~/components/common/easymde';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Form, FormField, FormMessage } from '~/components/ui/form';
import { UserInline } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { answerPostSchema } from '~/schemas/question';

interface QuestionAnswerPostFormProps {
  questionId: number;
}

export default function QuestionAnswerPostForm({ questionId }: Readonly<QuestionAnswerPostFormProps>) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof answerPostSchema>>({
    resolver: zodResolver(answerPostSchema),
    defaultValues: { content: '' },
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.setValue('content', easyMDERef.current?.value() || '');
    form.handleSubmit(onSubmit)(e);
  }

  function onSubmit(values: z.infer<typeof answerPostSchema>) {
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
    session && (
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <Card className="py-0 gap-0 overflow-hidden">
            <div className="sticky top-0 z-40 px-4 w-full h-16 min-h-16 bg-card/70 backdrop-blur flex items-center gap-2 rounded-t-xl border-b">
              <UserInline id={session.id} username={session.username} />
            </div>
            <EasyMDEEditor title={'답변 작성'} ref={easyMDERef}>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <CloudUploadIcon /> 게시하기
              </Button>
            </EasyMDEEditor>
            <FormField
              control={form.control}
              name="content"
              render={() => <FormMessage className="p-6 pt-0 text-center" />}
            />
          </Card>
        </form>
      </Form>
    )
  );
}
