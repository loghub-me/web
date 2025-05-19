import { Columns2Icon, EyeIcon, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { cn } from '~/lib/utils';

interface EasyMDEEditorProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  children?: React.ReactNode;
}

export default function EasyMDEEditor({ textareaRef, previewRef, title, children }: Readonly<EasyMDEEditorProps>) {
  const [mode, setMode] = useState<EditorMode>('preview-edit');

  function onModeChange(value: string) {
    if (!value) {
      return;
    }
    setMode(value as EditorMode);
  }

  return (
    <div className="w-full h-full max-h-full flex flex-col">
      <div className={cn('h-full max-h-full overflow-hidden grid', mode === 'preview-edit' && 'grid-cols-2')}>
        <div className={cn('h-full max-h-full overflow-hidden', mode === 'preview' && 'hidden')}>
          <textarea className="w-full h-full resize-none bg-card border-r" ref={textareaRef} />
        </div>
        <div ref={previewRef} className={cn('markdown-it p-6 overflow-auto', mode === 'edit' && 'hidden')} />
      </div>
      <div className="relative flex bg-card items-center justify-between border-t px-4 h-16 gap-2">
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
        {children}
      </div>
    </div>
  );
}
