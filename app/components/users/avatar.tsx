import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';

interface UserAvatarProps {
  username: string;
  size?: 'default' | 'sm' | 'xs';
}

export default function UserAvatar({ username, size }: Readonly<UserAvatarProps>) {
  return (
    <Avatar className={cn('size-6 border', size === 'sm' && 'size-5', size === 'xs' && 'size-4')}>
      {/*<AvatarImage src={`${import.meta.env.VITE_BUCKET_HOST}/avatars/${username}.webp`} />*/}
      <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
    </Avatar>
  );
}
