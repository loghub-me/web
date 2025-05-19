import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getArticle } from '~/apis/server/articles';
import { ArticleEditDialog, ArticleEditForm } from '~/components/articles';
import { EasyMDEEditor } from '~/components/common/easymde';
import AuthGuard from '~/guards/auth-guard';
import { useMDEEditor } from '~/hooks/use-mde-editor';
import { parseParams } from '~/lib/parse';
import { articleDetailSchema, articlePostSchema } from '~/schemas/articles';

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, articleDetailSchema);
  const article = await getArticle(username, slug);
  return { article };
}

export default function ArticleEditRoute({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const { title, content } = article;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { easyMDERef } = useMDEEditor({ textareaRef, previewRef, defaultValue: article.content });
  const form = useForm<z.infer<typeof articlePostSchema>>({
    resolver: zodResolver(articlePostSchema),
    defaultValues: {
      title,
      content,
      thumbnail: 'default/thumbnail.webp',
      topicSlugs: article.topics.map((topic) => topic.slug),
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
        <EasyMDEEditor textareaRef={textareaRef} previewRef={previewRef} title="아티클 수정">
          <ArticleEditDialog onOpenChange={onDialogOpenChange}>
            <ArticleEditForm form={form} id={article.id} />
          </ArticleEditDialog>
        </EasyMDEEditor>
      </main>
    </AuthGuard>
  );
}
