'use client';

import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadImageFile } from '@/lib/image/upload';
import { buildAssetsUrl, cn } from '@/lib/utils';
import '@/styles/easymde.css';
import { Button } from '@ui/button';
import { Kbd, KbdModifier } from '@ui/kbd';
import { ToggleGroup, ToggleGroupItem } from '@ui/toggle-group';
import type EasyMDE from 'easymde';
import { MarkdownRenderer } from 'loghub-me-markdown-renderer';
import { Columns2Icon, EyeIcon, ImageUpIcon, PencilIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

type EditorMode = 'edit' | 'preview' | 'preview-edit';
const editorModeValue = z.enum(['edit', 'preview', 'preview-edit']);
const placeholder = '# 나의 글은 최강이다.';

interface MarkdownEditorProps {
  ref: React.RefObject<EasyMDE | null>;
  title: string;
  defaultValue?: string;
  onDraftSave?: () => void;
  children?: React.ReactNode;
}

export default function MarkdownEditor({
  ref: easyMDERef,
  title,
  defaultValue = '',
  onDraftSave,
  children,
}: Readonly<MarkdownEditorProps>) {
  const rendererRef = useRef<MarkdownRenderer>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EditorMode>('preview-edit');
  const { status: authStatus } = useAuth();

  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (authStatus !== 'authenticated') {
        toast.error(ErrorMessage.LOGIN_REQUIRED);
        return;
      }
      if (!easyMDERef.current) {
        toast.error(ErrorMessage.UNKNOWN);
        return;
      }
      const { codemirror } = easyMDERef.current;
      const [doc, cursor] = [codemirror.getDoc(), codemirror.getCursor()];

      uploadImageFile(e)
        .then(({ filename, path }) => {
          const newLine = `![${filename}](${buildAssetsUrl(path)})`;
          doc.replaceRange(newLine, cursor);
        })
        .catch(handleError);
    },
  };

  const onModeChange = useCallback(
    (value: string) => {
      const { success, data } = editorModeValue.safeParse(value);
      if (!success) {
        toast.error(ErrorMessage.PARSE_ERROR);
        return;
      }
      setMode(data);
    },
    [setMode]
  );

  const onClickImageUpload = useCallback(() => {
    if (authStatus !== 'authenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    if (!inputFileRef.current) {
      toast.error(ErrorMessage.UNKNOWN);
      return;
    }
    inputFileRef.current.click();
  }, [authStatus]);

  useEffect(() => {
    if (typeof window === 'undefined' || !textareaRef.current) return;
    if (!rendererRef.current) {
      rendererRef.current = new MarkdownRenderer({ enabledPlugins: ['anchor', 'safeLink', 'captionedImage'] });
    }

    import('easymde').then((EasyMDEModule) => {
      const EasyMDEConstructor = EasyMDEModule.default;

      if (!textareaRef.current || !rendererRef.current || !previewRef.current) {
        return;
      }

      const easyMDE = new EasyMDEConstructor({
        element: textareaRef.current,
        toolbar: false,
        status: false,
        spellChecker: false,
        initialValue: defaultValue,
        placeholder: placeholder,
        inputStyle: 'textarea',
      });
      easyMDERef.current = easyMDE;

      easyMDE.codemirror.on('change', () => {
        const markdown = easyMDE.value();
        if (previewRef && previewRef.current && rendererRef.current) {
          previewRef.current.innerHTML = rendererRef.current.render(markdown);
        }
      });
      easyMDE.codemirror.addKeyMap({
        'Ctrl-I': onClickImageUpload,
        'Cmd-I': onClickImageUpload,
        'Ctrl-S': onDraftSave || (() => toast.info('게시 후 임시저장이 가능합니다.')),
        'Cmd-S': onDraftSave || (() => toast.info('게시 후 임시저장이 가능합니다.')),
      });

      if (defaultValue) {
        previewRef.current.innerHTML = rendererRef.current.render(defaultValue);
      }
    });

    return () => {
      if (easyMDERef.current) {
        easyMDERef.current.cleanup();
        easyMDERef.current.toTextArea();
        easyMDERef.current = null;
      }
    };
  }, [easyMDERef, defaultValue, onClickImageUpload, onDraftSave]);

  return (
    <div className="w-full h-full max-w-full max-h-full">
      <div className={cn('h-[calc(100%-theme(space.16))] grid min-h-56', mode === 'preview-edit' && 'grid-cols-2')}>
        <div className={cn('h-full max-h-full overflow-hidden', mode === 'preview' && 'hidden')}>
          <textarea className="w-full h-full resize-none border-r" ref={textareaRef} />
        </div>
        <div
          ref={previewRef}
          className={cn('markdown-it p-6 pb-92 bg-card overflow-auto border-l', mode === 'edit' && 'hidden')}
        />
      </div>
      <div className="relative flex bg-card items-center justify-between border-t px-4 h-16 min-h-16 gap-2">
        <ToggleGroup type={'single'} value={mode} onValueChange={onModeChange}>
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
        <h5 className="text-muted-foreground text-sm absolute left-1/2 -translate-x-1/2 hidden md:block">{title}</h5>
        <div className="flex gap-2">
          <input {...inputFileProps} />
          <Button type="button" variant={'outline'} className="has-[>svg]:px-2.5" onClick={onClickImageUpload}>
            <ImageUpIcon />
            <Kbd>
              <KbdModifier /> I
            </Kbd>
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
