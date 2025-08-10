import type EasyMDE from 'easymde';
import { MarkdownRenderer } from 'loghub-markdown-renderer';
import { Columns2Icon, EyeIcon, ImageUpIcon, PencilIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { ErrorMessage } from '~/constants/messages';
import { useAuth } from '~/hooks/use-auth';
import { defaultInputFileProps, uploadImageFile } from '~/lib/image/upload';
import { cn } from '~/lib/utils';

type EditorMode = 'edit' | 'preview' | 'preview-edit';

interface EasyMDEEditorProps {
  ref: React.RefObject<EasyMDE | null>;
  title: string;
  defaultValue?: string;
  children?: React.ReactNode;
}

export default function EasyMDEEditor({
  ref: easyMDERef,
  title,
  defaultValue = '',
  children,
}: Readonly<EasyMDEEditorProps>) {
  const rendererRef = useRef<MarkdownRenderer>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EditorMode>('preview-edit');
  const { status: authStatus } = useAuth();

  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      uploadImageFile(e)
        .then(({ filename, path }) => {
          easyMDERef.current?.value(
            easyMDERef.current?.value() + `\n![${filename}](${`${import.meta.env.VITE_BUCKET_HOST}/${path}`})`
          );
        })
        .catch((err) => toast.error(err.message)),
  };

  function onModeChange(value: string) {
    if (!value) {
      return;
    }
    setMode(value as EditorMode);
  }

  function onClickImageUpload() {
    if (authStatus !== 'authenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    inputFileRef.current?.click();
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !textareaRef.current) return;
    if (!rendererRef.current) {
      rendererRef.current = new MarkdownRenderer({
        useMarkdownItAnchor: true,
        useSafeLinkify: true,
        useSanitize: false,
      });
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
        placeholder: '# 나의 글은 최강이다.',
      });
      easyMDERef.current = easyMDE;

      easyMDE.codemirror.on('change', () => {
        const markdown = easyMDE.value();
        if (previewRef && previewRef.current && rendererRef.current) {
          previewRef.current.innerHTML = rendererRef.current.render(markdown);
        }
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
  }, [textareaRef, previewRef, defaultValue]);

  return (
    <div className="w-full h-full max-w-full max-h-full">
      <div className={cn('h-[calc(100%-theme(space.16))] grid', mode === 'preview-edit' && 'grid-cols-2')}>
        <div className={cn('h-full max-h-full overflow-hidden', mode === 'preview' && 'hidden')}>
          <textarea className="w-full h-full resize-none bg-card border-r" ref={textareaRef} />
        </div>
        <div ref={previewRef} className={cn('markdown-it p-6 overflow-auto', mode === 'edit' && 'hidden')} />
      </div>
      <div className="relative flex bg-card items-center justify-between border-t px-4 h-16 min-h-16 gap-2">
        <ToggleGroup type={'single'} value={mode} onValueChange={onModeChange}>
          <ToggleGroupItem value={'edit'}>
            <PencilIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value={'preview-edit'}>
            <Columns2Icon />
          </ToggleGroupItem>
          <ToggleGroupItem value={'preview'}>
            <EyeIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <h5 className="text-muted-foreground text-sm absolute left-1/2 -translate-x-1/2 hidden md:block">{title}</h5>
        <div className="flex gap-2">
          <input {...inputFileProps} />
          <Button type="button" variant="outline" size={'icon'} onClick={onClickImageUpload}>
            <ImageUpIcon />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
