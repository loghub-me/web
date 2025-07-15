import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EasyMDEEditor } from '~/components/common/easymde';
import { QuestionPostDialog, QuestionPostForm } from '~/components/question';
import { questionPostSchema } from '~/schemas/question';

export default function PostQuestionRoute() {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionPostSchema>>({
    resolver: zodResolver(questionPostSchema),
    defaultValues: { title: '', content: '', topicSlugs: [], requestBotAnswer: false },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <main className="max-h-screen h-screen pt-16">
      <EasyMDEEditor title="질문 작성" ref={easyMDERef}>
        <QuestionPostDialog onOpenChange={onDialogOpenChange}>
          <QuestionPostForm form={form} />
        </QuestionPostDialog>
      </EasyMDEEditor>
    </main>
  );
}
