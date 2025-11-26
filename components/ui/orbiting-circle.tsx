import { cn } from '@/lib/utils';
import React from 'react';

export interface OrbitingCircleProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircle({
  className,
  children,
  reverse,
  duration = 20,
  radius = 50,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCircleProps) {
  const calculatedDuration = duration / speed;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full border-black/10 dark:border-white/10',
        path ? 'border' : 'border-none',
        className
      )}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                '--orbit-duration': calculatedDuration,
                '--orbit-radius': radius,
                '--orbit-angle': angle,
                '--icon-size': `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
              { '[animation-direction:reverse]': reverse }
            )}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
