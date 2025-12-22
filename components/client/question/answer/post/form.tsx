'use client';

import { postQuestionAnswer } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { handleFormError } from '@/lib/error';
import { questionAnswerPostSchema } from '@/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Field, FieldError } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import type EasyMDE from 'easymde';
import { LetterTextIcon, MessageSquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionAnswerPostFormProps {
  questionId: number;
}

export default function QuestionAnswerPostForm({ questionId }: Readonly<QuestionAnswerPostFormProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionAnswerPostSchema>>({
    resolver: zodResolver(questionAnswerPostSchema),
    defaultValues: { title: '', content: '' },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof questionAnswerPostSchema>) {
    try {
      const { message } = await postQuestionAnswer(questionId, values);
      toast.success(message);
      form.reset();
      easyMDERef.current?.value('');
      router.refresh();
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <form id="question-answer-post-form" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name={'title'}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="p-2 border-b">
            <InputWithIcon
              {...field}
              id="question-answer-post-form-title"
              aria-invalid={fieldState.invalid}
              icon={LetterTextIcon}
              placeholder="제목을 입력해주세요"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <MarkdownEditor editor={{ ref: easyMDERef, title: '답변 작성' }}>
        <Button
          type={'button'}
          onClick={() => {
            form.setValue('content', easyMDERef.current?.value() || '');
            form.handleSubmit(onSubmit)();
          }}
        >
          <MessageSquareIcon /> 답변 등록
        </Button>
      </MarkdownEditor>
      <Controller
        control={form.control}
        name="content"
        render={({ fieldState }) => <FieldError errors={[fieldState.error]} className="pb-4 text-center" />}
      />
    </form>
  );
}
