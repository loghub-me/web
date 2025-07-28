import { Command as CommandPrimitive } from 'cmdk';
import { type LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '~/lib/utils';

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('relative bg-popover text-popover-foreground flex h-full w-full flex-col', className)}
      {...props}
    />
  );
}

function CommandInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & { icon: LucideIcon }) {
  return (
    <div data-slot="command-input-wrapper" className="relative w-full h-9">
      <Icon className="absolute top-2.75 left-3.25 size-3.5 text-muted-foreground" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'shadow-xs placeholder:text-muted-foreground absolute pl-9.5 border flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'absolute z-50 top-10 p-1 w-full h-300px max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto bg-card rounded-md border',
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-muted-foreground text-sm"
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandItem };
