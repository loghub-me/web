'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

function LabelRequired({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="label-required" className={cn('text-destructive', className)} aria-hidden="true" {...props}>
      *
    </span>
  );
}

function LabelOptional({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="label-optional"
      className={cn('text-muted-foreground font-normal', className)}
      aria-hidden="true"
      {...props}
    >
      (선택)
    </span>
  );
}

export { Label, LabelRequired, LabelOptional };
