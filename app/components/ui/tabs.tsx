import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '~/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn(className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn(className)} {...props} />;
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex gap-3 p-3 w-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-xs data-state=active]:hover:bg-secondary/80 rounded-lg transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

function TabsTitle({ className, ...props }: React.ComponentProps<'h5'>) {
  return (
    <h5 data-slot="tabs-title" className={cn('text-lg font-semibold', className)} {...props}>
      {props.children}
    </h5>
  );
}

function TabsDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="tabs-description" className={cn('text-sm text-muted-foreground', className)} {...props}>
      {props.children}
    </p>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsTitle, TabsDescription };
