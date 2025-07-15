import type EasyMDE from 'easymde';
import { Columns2Icon, EyeIcon, ImageUpIcon, PencilIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { defaultInputFileProps, uploadImageFile } from '~/lib/image/upload';
import { parseMarkdown } from '~/lib/markdown/parse';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EditorMode>('preview-edit');

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

  useEffect(() => {
    if (typeof window === 'undefined' || !textareaRef.current) return;

    import('easymde').then((EasyMDEModule) => {
      const EasyMDEConstructor = EasyMDEModule.default;

      if (!textareaRef.current) {
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

      if (previewRef && previewRef.current) {
        easyMDE.codemirror.on('change', () => {
          const markdown = easyMDE.value();
          if (previewRef?.current) {
            previewRef.current.innerHTML = parseMarkdown(markdown);
          }
        });
      }
      if (previewRef && previewRef.current && defaultValue) {
        previewRef.current.innerHTML = parseMarkdown(defaultValue);
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
          <ToggleGroupItem value={'update'}>
            <PencilIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value={'preview-update'}>
            <Columns2Icon />
          </ToggleGroupItem>
          <ToggleGroupItem value={'preview'}>
            <EyeIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <h5 className="text-muted-foreground text-sm absolute left-1/2 -translate-x-1/2 hidden md:block">{title}</h5>
        <div className="flex gap-2">
          <input {...inputFileProps} />
          <Button type="button" variant="outline" size="icon" onClick={() => inputFileRef.current?.click()}>
            <ImageUpIcon />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
