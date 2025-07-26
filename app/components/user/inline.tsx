import { UserAvatar } from '~/components/user';

interface UserInlineProps {
  id: number;
  username: string;
}

export default function UserInline({ id, username }: Readonly<UserInlineProps>) {
  return (
    <div className="flex items-center gap-1.5">
      <UserAvatar id={id} username={username} className="mt-0.5" />
      <span className="text-sm font-medium group-hover:text-accent-foreground">@{username}</span>
    </div>
  );
}
