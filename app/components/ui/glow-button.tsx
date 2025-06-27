import type { VariantProps } from 'class-variance-authority';
import { Button, type buttonVariants } from '~/components/ui/button';
import { GlowEffect } from '~/components/ui/glow-effect';
import { cn } from '~/lib/utils';

function GlowButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  return (
    <div className="relative group">
      <GlowEffect
        className="transition-opacity ease-in opacity-0 group-hover:opacity-100"
        mode="rotate"
        blur="soft"
        scale={0.9}
      />
      <Button {...props} className={cn(className, 'relative w-full')} variant={variant} size={size} asChild={asChild} />
    </div>
  );
}

export { GlowButton };
