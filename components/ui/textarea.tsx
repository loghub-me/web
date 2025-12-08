import { cn } from '@/lib/utils';
import { ChangeEvent, useCallback } from 'react';

function Textarea({
  className,
  onChange,
  autoHeight = false,
  ...props
}: React.ComponentProps<'textarea'> & { autoHeight?: boolean }) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);

      if (autoHeight) {
        const target = e.target;
        target.style.height = '0px';
        target.style.height = `${target.scrollHeight}px`;
      }
    },
    [onChange, autoHeight]
  );

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        autoHeight && 'resize-none overflow-hidden',
        className
      )}
      onChange={handleChange}
      {...props}
    />
  );
}

export { Textarea };
