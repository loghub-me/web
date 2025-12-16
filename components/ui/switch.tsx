'use client';

import { cn } from '@/lib/utils';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { LucideIcon } from 'lucide-react';

function Switch({ className, children, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-[3px] aria-invalid:ring-[3px] h-5 w-9 peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        children && 'h-8 w-14',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full size-4 data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform',
          children &&
            'h-6 w-6 flex items-center justify-center data-checked:translate-x-[1.76rem] data-unchecked:translate-x-[0.2rem]'
        )}
      >
        {children}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

function SwitchIcon({
  enabledIcon: EnabledIcon,
  disabledIcon: DisabledIcon,
  value,
}: Readonly<{ enabledIcon: LucideIcon; disabledIcon: LucideIcon; value: boolean }>) {
  const base = 'absolute size-4 transition-transform text-black';

  return (
    <>
      <EnabledIcon className={cn(base, value ? 'visible animate-swing' : 'invisible')} />
      <DisabledIcon className={cn(base, !value ? 'visible animate-swing' : 'invisible')} />
    </>
  );
}

export { Switch, SwitchIcon };
