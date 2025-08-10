import type { Route } from './+types/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getArticle } from '~/apis/server/article';
import { ArticleEditDialog, ArticleEditForm } from '~/components/article';
import { EasyMDEEditor } from '~/components/common/easymde';
import { createMetadata } from '~/constants/meta';
import AuthGuard from '~/guards/auth-guard';
import { parseParams } from '~/lib/parse';
import { articleEditSchema } from '~/schemas/article';
import { compositeKeySchema } from '~/schemas/common';

export const meta: Route.MetaFunction = ({ data }) =>
  createMetadata(data?.article.title, data?.article.content.markdown.substring(20));

export async function loader({ params }: Route.LoaderArgs) {
  const { username, slug } = parseParams(params, compositeKeySchema);
  const article = await getArticle(username, slug);
  return { article };
}

export default function ArticleEditRoute({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const { title, content, thumbnail } = article;

  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof articleEditSchema>>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: {
      title,
      content: content.markdown,
      thumbnail: thumbnail,
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
        <EasyMDEEditor title="아티클 수정" ref={easyMDERef} defaultValue={content.markdown}>
          <ArticleEditDialog onOpenChange={onDialogOpenChange}>
            <ArticleEditForm form={form} id={article.id} />
          </ArticleEditDialog>
        </EasyMDEEditor>
      </main>
    </AuthGuard>
  );
}
