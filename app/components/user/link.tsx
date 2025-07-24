import type { VariantProps } from 'class-variance-authority';
import { ButtonLink, buttonVariants } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { cn } from '~/lib/utils';

interface UserLinkProps extends VariantProps<typeof buttonVariants> {
  id: number;
  username: string;
  message?: string;
  className?: string;
}

export default function UserLink({ id, username, message, className, variant, size }: Readonly<UserLinkProps>) {
  return (
    <ButtonLink to={`/@${username}`} variant={variant} size={size} className={cn('px-2', className)}>
      <UserAvatar id={id} username={username} className="mt-0.5" />
      <span className="text-sm group-hover:text-accent-foreground">
        @{username} {message}
      </span>
    </ButtonLink>
  );
}
