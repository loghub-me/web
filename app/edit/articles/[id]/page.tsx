'use client';

import { getArticleForEdit } from '@/apis/client/article';
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
  const { data: article, error } = useQuery({
    queryKey: ['getArticleForEdit', id],
    queryFn: () => getArticleForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
  });

  useQueryErrorHandle(error, '/search/articles');

  return <main className="max-h-screen h-screen pt-16">{article && <ArticleEditor defaultValues={article} />}</main>;
}

interface ArticleEditorProps {
  defaultValues: ArticleForEdit;
}

function ArticleEditor({ defaultValues }: Readonly<ArticleEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof articleEditSchema>>({ resolver: zodResolver(articleEditSchema), defaultValues });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
        titleField: 'title',
        contentField: 'content',
      });
    }
  }

  return (
    <MarkdownEditor title={`[수정] ${defaultValues.title}`} ref={easyMDERef} defaultValue={defaultValues.content}>
      <ArticleEditDialog onOpenChange={onDialogOpenChange}>
        <ArticleEditForm id={defaultValues.id} form={form} />
      </ArticleEditDialog>
    </MarkdownEditor>
  );
}
