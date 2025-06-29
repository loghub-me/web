import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { cn } from '~/lib/utils';

interface UserLinkProps {
  username: string;
  className?: string;
}

export default function UserLink({ username, className }: Readonly<UserLinkProps>) {
  return (
    <Button variant={'ghost'} className={cn('px-2', className)} asChild>
      <Link to={`/@${username}`}>
        <UserAvatar username={username} className="mt-0.5" />
        <span className="text-sm group-hover:text-accent-foreground">@{username}</span>
      </Link>
    </Button>
  );
}
