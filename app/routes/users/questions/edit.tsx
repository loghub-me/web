import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getQuestion } from '~/apis/server/question';
import { EasyMDEEditor } from '~/components/common/easymde';
import { QuestionEditDialog, QuestionEditForm } from '~/components/question';
import AuthGuard from '~/guards/auth-guard';
import { parseParams } from '~/lib/parse';
import { compositeKeySchema } from '~/schemas/common';
import { questionEditSchema } from '~/schemas/question';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const question = await getQuestion(username, slug);
  return { question };
}

export default function QuestionEditRoute({ loaderData }: Route.ComponentProps) {
  const { question } = loaderData;
  const { title, content } = question;

  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionEditSchema>>({
    resolver: zodResolver(questionEditSchema),
    defaultValues: {
      title,
      content: content.markdown,
      topicSlugs: question.topics.map((topic) => topic.slug),
    },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <AuthGuard>
      <main className="max-h-screen h-screen pt-16">
        <EasyMDEEditor title="아티클 작성" ref={easyMDERef} defaultValue={content.markdown}>
          <QuestionEditDialog onOpenChange={onDialogOpenChange}>
            <QuestionEditForm form={form} id={question.id} />
          </QuestionEditDialog>
        </EasyMDEEditor>
      </main>
    </AuthGuard>
  );
}
