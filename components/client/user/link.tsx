import { UserAvatar } from '@/components/client/user';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import type { VariantProps } from 'class-variance-authority';

interface UserLinkProps extends VariantProps<typeof buttonVariants> {
  id: number;
  username: string;
  message?: string;
  className?: string;
}

export default function UserLink({ id, username, message, className, variant }: Readonly<UserLinkProps>) {
  return (
    <ButtonLink
      href={`/${username}`}
      variant={variant}
      size={'sm'}
      className={cn('px-1.5', variant === 'link' && 'px-0', className)}
    >
      <UserAvatar id={id} username={username} className="mt-0.5" />
      <span className="text-sm group-hover:text-accent-foreground">
        @{username} {message}
      </span>
    </ButtonLink>
  );
}
