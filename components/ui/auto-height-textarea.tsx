'use client';

import { cn } from '@/lib/utils';
import { Textarea } from '@ui/textarea';
import { useRef, useEffect } from 'react';

function AutoHeightTextarea({ className, value, ...props }: React.ComponentProps<'textarea'>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const target = textareaRef.current;
    if (!target) return;
    target.style.height = '0px';
    target.style.height = `${target.scrollHeight}px`;
  }, [value]);

  return (
    <Textarea className={cn(className, 'resize-none overflow-hidden')} value={value} {...props} ref={textareaRef} />
  );
}

export { AutoHeightTextarea };
