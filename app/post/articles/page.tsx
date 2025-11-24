'use client';

import { ArticlePostDialog, ArticlePostForm } from '@/components/client/article';
import { MarkdownEditor } from '@/components/client/markdown';
import { syncEditorWithForm } from '@/lib/form';
import { articlePostSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ArticlePostPage() {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof articlePostSchema>>({
    resolver: zodResolver(articlePostSchema),
    defaultValues: { title: '', content: '', thumbnail: 'default/article-thumbnail.webp', topicSlugs: [] },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      syncEditorWithForm(easyMDERef, form.getValues('title'), form.setValue, {
        titleField: 'title',
        contentField: 'content',
      });
    }
  }

  return (
    <main className="max-h-screen h-screen pt-16">
      <MarkdownEditor title="아티클 작성" ref={easyMDERef}>
        <ArticlePostDialog onOpenChange={onDialogOpenChange}>
          <ArticlePostForm form={form} />
        </ArticlePostDialog>
      </MarkdownEditor>
    </main>
  );
}
