import { cn } from '@/lib/utils';
import { Textarea } from '@ui/textarea';
import { useCallback, ChangeEvent } from 'react';

function AutoHeightTextarea({ className, onChange, ...props }: React.ComponentProps<'textarea'>) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      const target = e.target;
      target.style.height = '0px';
      target.style.height = `${target.scrollHeight}px`;
    },
    [onChange]
  );

  return <Textarea className={cn(className, 'resize-none overflow-hidden')} onChange={handleChange} {...props} />;
}

export { AutoHeightTextarea };
