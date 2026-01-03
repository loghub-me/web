'use client';

import { MarkdownDraftSaveButton, MarkdownImageUploadButton } from '@/components/client/markdown';
import { ErrorMessage } from '@/constants/messages';
import { cn } from '@/lib/utils';
import '@/styles/easymde.css';
import { Separator } from '@ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@ui/toggle-group';
import type EasyMDE from 'easymde';
import { Options as EasyMDEOptions } from 'easymde';
import { MarkdownRenderer } from 'loghub-me-markdown-renderer';
import { Columns2Icon, EyeIcon, PencilIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

type EditorMode = 'edit' | 'preview' | 'preview-edit';
const editorModeValue = z.enum(['edit', 'preview', 'preview-edit']);
const placeholder = '# 나의 글은 최강이다.';

interface MarkdownEditorProps {
  editor: {
    ref: React.RefObject<EasyMDE | null>;
    title: string;
    defaultValue?: string;
  };
  draft?: {
    queryKey: readonly (string | number)[];
    exists: boolean;
    saveDraft: (draft: string) => Promise<MessageResponseBody>;
    deleteDraft: () => Promise<MessageResponseBody>;
  };
  fullscreen?: boolean;
  children?: React.ReactNode;
}

export default function MarkdownEditor({ editor, draft, fullscreen = true, children }: Readonly<MarkdownEditorProps>) {
  const { ref: easyMDERef, title, defaultValue = '' } = editor;
  const rendererRef = useRef<MarkdownRenderer>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<EditorMode>('preview-edit');
  const [ready, setReady] = useState(false);
  const [contentLength, setContentLength] = useState(defaultValue.length);

  const onModeChange = useCallback(
    (value: string[]) => {
      if (value.length === 0) return;
      const { success, data } = editorModeValue.safeParse(value[0]);
      if (!success) {
        toast.error(ErrorMessage.PARSE_ERROR);
        return;
      }
      setMode(data);
    },
    [setMode]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !textareaRef.current) return;
    if (!rendererRef.current) {
      rendererRef.current = new MarkdownRenderer({ enabledPlugins: ['anchor', 'safeLink', 'captionedImage'] });
    }

    import('easymde').then((EasyMDEModule) => {
      if (!textareaRef.current || !rendererRef.current || !previewRef.current) {
        return;
      }

      const EasyMDEConstructor = EasyMDEModule.default;
      const easyMDE = new EasyMDEConstructor({
        element: textareaRef.current,
        toolbar: false,
        status: false,
        spellChecker: false,
        initialValue: defaultValue,
        placeholder: placeholder,
        inputStyle: 'textarea',
      } satisfies EasyMDEOptions);
      easyMDERef.current = easyMDE;

      easyMDE.codemirror.on('change', () => {
        const markdown = easyMDE.value();
        if (previewRef && previewRef.current && rendererRef.current) {
          previewRef.current.innerHTML = rendererRef.current.render(markdown);
        }
        setContentLength(markdown.length);
      });

      if (defaultValue) {
        previewRef.current.innerHTML = rendererRef.current.render(defaultValue);
      }
      setReady(true);
    });

    return () => {
      if (easyMDERef.current) {
        easyMDERef.current.cleanup();
        easyMDERef.current.toTextArea();
        easyMDERef.current = null;
      }
    };
  }, [easyMDERef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-full max-w-full max-h-full">
      <div className={cn('h-[calc(100%-theme(space.16))] grid min-h-56', mode === 'preview-edit' && 'grid-cols-2')}>
        <div
          className={cn(
            'h-full max-h-full overflow-hidden',
            fullscreen && 'fullscreen',
            mode === 'preview' && 'hidden'
          )}
        >
          <textarea className="w-full h-full resize-none border-r" ref={textareaRef} />
        </div>
        <div
          ref={previewRef}
          className={cn(
            'markdown-it p-6 bg-card overflow-auto border-l',
            fullscreen && 'pb-[80vh]',
            mode === 'edit' && 'hidden'
          )}
        />
      </div>
      <div className="flex justify-between gap-4 bg-card border-t px-4 h-16 min-h-16">
        <div className="flex-1 flex items-center justify-between gap-2">
          <ToggleGroup value={[mode]} onValueChange={onModeChange} spacing={0.5}>
            <ToggleGroupItem value={'edit'} className="size-9">
              <PencilIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value={'preview-edit'} className="size-9">
              <Columns2Icon />
            </ToggleGroupItem>
            <ToggleGroupItem value={'preview'} className="size-9">
              <EyeIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="text-sm text-muted-foreground hidden md:inline-block">{contentLength}/16384 자 입력</span>
        </div>
        <Separator orientation="vertical" className="my-auto h-5 hidden md:inline-block" />
        <div className="flex-1 flex items-center justify-between gap-2">
          <h5 className="text-sm hidden md:inline-block">{title}</h5>
          <div className="flex gap-2">
            {ready && <MarkdownImageUploadButton easyMDERef={easyMDERef} />}
            {ready && draft && <MarkdownDraftSaveButton easyMDERef={easyMDERef} {...draft} />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
