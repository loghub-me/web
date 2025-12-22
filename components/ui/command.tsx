'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@ui/dialog';
import { Kbd } from '@ui/kbd';
import { Command as CommandPrimitive } from 'cmdk';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

declare type CommandFilter = (value: string, search: string, keywords?: string[]) => number;

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'dark:bg-input/30 bg-transparent text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  filter,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
  filter?: CommandFilter;
}) {
  return (
    <Dialog {...props} modal>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('top-92 overflow-hidden p-1.5 gap-1 bg-background/90 backdrop-blur', className)}
        showCloseButton={showCloseButton}
      >
        <Command filter={filter} className="border">
          {children}
        </Command>
        <div className="flex flex-wrap">
          <Badge variant={'muted'} className="px-1">
            <Kbd className="border">↑</Kbd> <Kbd className="border">↓</Kbd> <span>이동</span>
          </Badge>
          <Badge variant={'muted'} className="px-1 ml-auto">
            <Kbd className="border">⏎</Kbd> <span>선택</span>
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  icon: LucideIcon;
}) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 px-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
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
      className={cn('scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  );
}

function CommandEmpty({
  icon: Icon,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  icon?: LucideIcon;
}) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn('py-6 text-center text-sm', Icon && 'w-full flex items-center justify-center gap-1.5')}
      {...props}
    >
      {Icon && <Icon className="size-3.5 text-muted-foreground" />}
      {children}
    </CommandPrimitive.Empty>
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden px-2 pb-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
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

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
