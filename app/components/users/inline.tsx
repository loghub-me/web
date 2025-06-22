import { UserAvatar } from '~/components/users/index';
import { cn } from '~/lib/utils';

interface UserInlineProps {
  username: string;
  nickname?: string;
  size?: 'default' | 'sm' | 'xs';
}

export default function UserInline({ username, nickname, size = 'default' }: Readonly<UserInlineProps>) {
  return (
    <div className="flex items-center gap-1.5">
      <UserAvatar username={username} size={size} />
      <span className={cn('text-sm group-hover:text-accent-foreground', size === 'xs' && 'text-xs')}>
        {nickname ? `${nickname}` : `@${username}`}
      </span>
    </div>
  );
}
