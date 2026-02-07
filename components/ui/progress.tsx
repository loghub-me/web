'use client';

import { cn } from '@/lib/utils';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';

function Progress({ className, children, value, ...props }: ProgressPrimitive.Root.Props) {
  const getColorClass = (value: number) => {
    if (value <= 25) return 'from-primary/25 to-primary/50 bg-gradient-to-r';
    if (value <= 50) return 'from-primary/50 to-primary/75 bg-gradient-to-r';
    if (value <= 75) return 'from-primary/75 to-primary/90 bg-gradient-to-r';
    return 'bg-primary';
  };

  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn('flex flex-wrap gap-3', className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator className={getColorClass(value ?? 0)} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn('bg-muted h-2 rounded-[2.4px] relative flex w-full items-center overflow-x-hidden', className)}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn('bg-primary h-full transition-all', className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label className={cn('text-sm font-medium', className)} data-slot="progress-label" {...props} />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn('text-muted-foreground ml-auto text-sm tabular-nums', className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
