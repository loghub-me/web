'use client';

import { deleteArticleDraft, getArticleForEdit, updateArticleDraft } from '@/apis/client/article';
import { ArticleEditDialog, ArticleEditForm } from '@/components/client/article';
import { MarkdownEditor } from '@/components/client/markdown';
import { useAuth } from '@/hooks/use-auth';
import { useQueryErrorHandle } from '@/hooks/use-query-error-handle';
import { handleError } from '@/lib/error';
import { syncEditorWithForm } from '@/lib/form';
import { parseObject } from '@/lib/parse';
import { articleEditSchema } from '@/schemas/article';
import { idSchema } from '@/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Kbd, KbdModifier } from '@ui/kbd';
import type EasyMDE from 'easymde';
import { DeleteIcon, SaveIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const queryClient = useQueryClient();
  const [hasDraft, setHasDraft] = useState(Boolean(article.draft));

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

  const onDraftSave = () => {
    if (!easyMDERef.current) return;
    const draft = easyMDERef.current.value();

    updateArticleDraft(article.id, easyMDERef.current.value())
      .then(({ message }) => {
        toast.success(message, { icon: <SaveIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, (old) => (old ? { ...old, draft } : old));
        setHasDraft(true);
      })
      .catch(handleError);
  };

  const onDraftDelete = () => {
    if (!easyMDERef.current) return;

    deleteArticleDraft(article.id)
      .then(({ message }) => {
        toast.success(message, { icon: <DeleteIcon className="size-4" /> });
        queryClient.setQueryData(queryKey, { ...article, draft: undefined });
        easyMDERef.current?.value(article.content);
        form.setValue('content', article.content);
        setHasDraft(false);
      })
      .catch(handleError);
  };

  return (
    <MarkdownEditor
      title={`[수정] ${article.title}`}
      ref={easyMDERef}
      defaultValue={resolvedContent}
      onDraftSave={onDraftSave}
    >
      <ButtonGroup>
        <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onDraftSave}>
          <SaveIcon />
          <Kbd>
            <KbdModifier /> S
          </Kbd>
        </Button>
        {hasDraft && (
          <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onDraftDelete}>
            <DeleteIcon />
          </Button>
        )}
      </ButtonGroup>
      <ArticleEditDialog onOpenChange={onDialogOpenChange}>
        <ArticleEditForm id={article.id} form={form} />
      </ArticleEditDialog>
    </MarkdownEditor>
  );
}
