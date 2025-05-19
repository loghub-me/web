import type EasyMDE from 'easymde';
import { useEffect, useRef } from 'react';
import { parseMarkdown } from '~/lib/markdown/parse';

interface UseMDEEditorOptions {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onChange?: (instance: CodeMirror.Editor, changeObj: CodeMirror.EditorChange) => void;
  onKeydown?: (instance: CodeMirror.Editor, event: KeyboardEvent) => void;
  defaultValue?: string;
}

export function useMDEEditor({ textareaRef, previewRef, onChange, onKeydown, defaultValue }: UseMDEEditorOptions) {
  const easyMDERef = useRef<EasyMDE>(null);

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

      if (!!onChange) easyMDE.codemirror.on('change', onChange);
      if (!!onKeydown) easyMDE.codemirror.on('keydown', onKeydown);
    });

    return () => {
      if (easyMDERef.current) {
        easyMDERef.current.cleanup();
        easyMDERef.current.toTextArea();
        easyMDERef.current = null;
      }
    };
  }, [textareaRef, previewRef, onChange, onKeydown]);

  return { easyMDERef };
}
