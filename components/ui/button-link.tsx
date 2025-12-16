import { buttonVariants, Button } from './button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { LinkProps } from 'next/link';

function ButtonLink({
  className,
  variant = 'ghost',
  size,
  href,
  disabled = false,
  prefetch = false,
  ...props
}: LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  VariantProps<typeof buttonVariants> & { className?: string; disabled?: boolean }) {
  if (disabled) {
    return (
      <Button variant={variant} size={size} disabled={true}>
        {props.children}
      </Button>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {props.children}
    </Link>
  );
}

export { ButtonLink };
