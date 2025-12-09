'use client';

import { deleteArticleDraft, getArticleForEdit, updateArticleDraft } from '@/apis/client/article';
import { ArticleEditDialog, ArticleEditForm } from '@/components/client/article';
import { MarkdownEditor } from '@/components/client/markdown';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { articleEditSchema } from '@/schemas/article';
import { idSchema } from '@/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import type EasyMDE from 'easymde';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ArticleEditPage() {
  const params = useParams<{ id: string }>();
  const { id } = parseObject(params, idSchema);
  const { status } = useAuth();

  const queryKey = ['getArticleForEdit', id] as const;
  const { data: article, error } = useQuery({
    queryKey,
    queryFn: () => getArticleForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/articles');

  return (
    <main className="max-h-screen h-screen pt-16">
      {article && <ArticleEditor article={article} queryKey={queryKey} />}
    </main>
  );
}

interface ArticleEditorProps {
  article: ArticleForEdit;
  queryKey: readonly [string, number];
}

function ArticleEditor({ article, queryKey }: Readonly<ArticleEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const resolvedContent = article.draft || article.content;
  const form = useForm<z.infer<typeof articleEditSchema>>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: { ...article, content: resolvedContent },
  });

  const onDialogOpenChange = (open: boolean) => {
    if (!open) return;
    syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
      titleField: 'title',
      contentField: 'content',
    });
  };

  return (
    <MarkdownEditor
      editor={{
        ref: easyMDERef,
        title: `[수정] ${article.title}`,
        defaultValue: resolvedContent,
      }}
      draft={{
        exists: Boolean(article.draft),
        queryKey,
        saveDraft: async (draft: string) => updateArticleDraft(article.id, draft),
        deleteDraft: async () =>
          deleteArticleDraft(article.id).then((res) => {
            easyMDERef.current?.value(article.content);
            form.setValue('content', article.content);
            return res;
          }),
      }}
    >
      <ArticleEditDialog onOpenChange={onDialogOpenChange}>
        <ArticleEditForm id={article.id} form={form} />
      </ArticleEditDialog>
    </MarkdownEditor>
  );
}
