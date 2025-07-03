import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { PencilIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { editAnswer } from '~/apis/client/question';
import { EasyMDEEditor } from '~/components/common/easymde';
import { Button } from '~/components/ui/button';
import { Form, FormField, FormMessage } from '~/components/ui/form';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { answerPostSchema } from '~/schemas/question';

interface AnswerEditFormProps {
  questionId: number;
  answerId: number;
  defaultContent: string;
  closeEditForm: () => void;
}

export default function AnswerEditForm({
  questionId,
  answerId,
  defaultContent,
  closeEditForm,
}: Readonly<AnswerEditFormProps>) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof answerPostSchema>>({
    resolver: zodResolver(answerPostSchema),
    defaultValues: { content: defaultContent },
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.setValue('content', easyMDERef.current?.value() || '');
    form.handleSubmit(onSubmit)(e);
  }

  function onSubmit(values: z.infer<typeof answerPostSchema>) {
    editAnswer(questionId, answerId, values)
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
    session && (
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <EasyMDEEditor title={'답변 수정'} ref={easyMDERef} defaultValue={defaultContent}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <PencilIcon /> 수정하기
            </Button>
          </EasyMDEEditor>
          <FormField
            control={form.control}
            name="content"
            render={() => <FormMessage className="p-6 pt-0 text-center" />}
          />
        </form>
      </Form>
    )
  );
}
