import { UserAvatar } from '~/components/users/index';

interface UserInlineProps {
  username: string;
  nickname?: string;
}

export default function UserInline({ username, nickname }: Readonly<UserInlineProps>) {
  return (
    <div className="flex items-center gap-1.5">
      <UserAvatar username={username} className="mt-0.5" />
      <span className="text-sm group-hover:text-accent-foreground">{nickname ? `${nickname}` : `@${username}`}</span>
    </div>
  );
}
