import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon, MoveUpRightIcon } from 'lucide-react';
import * as React from 'react';
import { Link, NavLink } from 'react-router';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-card shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        multi: 'px-3 h-9 border-0 rounded-none first:pl-3.5 last:pr-3.5 border-r last:border-r-0',
        custom: 'h-auto p-auto has-[>svg]:p-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

function ButtonLink({
  className,
  variant = 'ghost',
  size,
  to,
  disabled = false,
  ...props
}: React.ComponentProps<'a'> & VariantProps<typeof buttonVariants> & { to: string; disabled?: boolean }) {
  if (disabled) {
    return (
      <Button variant={variant} disabled={true}>
        {props.children}
      </Button>
    );
  }

  return (
    <Link to={to} data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {props.children}
    </Link>
  );
}

function JumboButtonLink({
  className,
  variant = 'outline',
  to,
  icon: Icon,
  disabled = false,
  ...props
}: React.ComponentProps<'a'> &
  VariantProps<typeof buttonVariants> & { to: string; icon: LucideIcon; disabled?: boolean }) {
  return (
    <ButtonLink
      to={to}
      variant={'outline'}
      size={'custom'}
      className={cn('group relative flex-1 flex-col items-start p-4 h-auto gap-4 rounded-lg', className)}
    >
      <MoveUpRightIcon className="absolute top-4 right-4 group-hover:top-3 group-hover:right-3 transition-all text-muted-foreground" />
      <Icon className="size-6" />
      <div className="space-y-1">{props.children}</div>
    </ButtonLink>
  );
}

function ButtonNavLink({
  className,
  variant,
  size,
  to,
  end = false,
  ...props
}: React.ComponentProps<'a'> & VariantProps<typeof buttonVariants> & { to: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      data-slot="button"
      className={({ isActive }) =>
        cn(
          isActive
            ? buttonVariants({ variant: 'secondary', size, className })
            : buttonVariants({ variant: 'ghost', size, className })
        )
      }
      {...props}
      end={end}
    >
      {props.children}
    </NavLink>
  );
}

export { Button, ButtonLink, JumboButtonLink, ButtonNavLink, buttonVariants };
