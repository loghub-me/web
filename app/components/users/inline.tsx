import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface UserInlineProps {
  username: string;
  nickname?: string;
}

export default function UserInline({ username, nickname }: Readonly<UserInlineProps>) {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="size-6">
        <AvatarImage src={`${import.meta.env.VITE_BUCKET_HOST}/avatars/${username}.webp`} />
        <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
      </Avatar>
      <span className="text-sm group-hover:text-accent-foreground">{nickname ? `${nickname}` : `@${username}`}</span>
    </div>
  );
}
