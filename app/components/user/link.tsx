import { ButtonLink } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { cn } from '~/lib/utils';

interface UserLinkProps {
  id: number;
  username: string;
  className?: string;
}

export default function UserLink({ id, username, className }: Readonly<UserLinkProps>) {
  return (
    <ButtonLink to={`/@${username}`} className={cn('px-2', className)}>
      <UserAvatar id={id} username={username} className="mt-0.5" />
      <span className="text-sm group-hover:text-accent-foreground">@{username}</span>
    </ButtonLink>
  );
}
