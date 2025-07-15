import type { Route } from './+types/articles';
import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArticlePostDialog, ArticlePostForm } from '~/components/article';
import { EasyMDEEditor } from '~/components/common/easymde';
import { articlePostSchema } from '~/schemas/article';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const autosave = localStorage.getItem('autosave:post-articles');
  return { autosave };
}

export default function PostArticleRoute({ loaderData: { autosave } }: Route.ComponentProps) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof articlePostSchema>>({
    resolver: zodResolver(articlePostSchema),
    defaultValues: { title: '', content: '', thumbnail: 'default/thumbnail.webp', topicSlugs: [] },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <main className="max-h-screen h-screen pt-16">
      <EasyMDEEditor title="아티클 작성" ref={easyMDERef}>
        <ArticlePostDialog onOpenChange={onDialogOpenChange}>
          <ArticlePostForm form={form} />
        </ArticlePostDialog>
      </EasyMDEEditor>
    </main>
  );
}
