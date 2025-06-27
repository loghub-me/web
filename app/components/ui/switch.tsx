import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '~/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        props.children && 'h-8 w-14',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
          props.children &&
            'h-6 w-6 flex items-center justify-center data-[state=checked]:translate-x-[1.6rem] data-[state=unchecked]:translate-x-[0.2rem]'
        )}
      >
        {props.children}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

function SwitchIcon({
  enabledIcon: EnabledIcon,
  disabledIcon: DisabledIcon,
  value,
}: Readonly<{ enabledIcon: LucideIcon; disabledIcon: LucideIcon; value: boolean }>) {
  return (
    <>
      <EnabledIcon
        className={cn('absolute size-4 transition-transform', value ? 'visible animate-swing' : 'invisible')}
      />
      <DisabledIcon
        className={cn('absolute size-4 transition-transform', !value ? 'visible animate-swing' : 'invisible')}
      />
    </>
  );
}

export { Switch, SwitchIcon };
