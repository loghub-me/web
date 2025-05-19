import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { ArticlePostDialog, ArticlePostForm } from '~/components/articles';
import { EasyMDEEditor } from '~/components/common/easymde';
import { useMDEEditor } from '~/hooks/use-mde-editor';
import { articlePostSchema } from '~/schemas/articles';

export default function PostArticlesRoute() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { easyMDERef } = useMDEEditor({ textareaRef, previewRef });
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
      <EasyMDEEditor textareaRef={textareaRef} previewRef={previewRef} title="아티클 작성">
        <ArticlePostDialog onOpenChange={onDialogOpenChange}>
          <ArticlePostForm form={form} />
        </ArticlePostDialog>
      </EasyMDEEditor>
    </main>
  );
}
