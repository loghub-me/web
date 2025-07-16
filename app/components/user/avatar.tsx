import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';

type AvatarSize = 'default' | 'xs' | 'sm' | 'lg' | 'xl';

interface UserAvatarProps {
  id: number;
  username: string;
  size?: AvatarSize;
  className?: string;
}

export default function UserAvatar({ id, username, size, className }: Readonly<UserAvatarProps>) {
  const avatarSize: Record<AvatarSize, string> = {
    default: 'size-6',
    xs: 'size-4',
    sm: 'size-5',
    lg: 'size-32',
    xl: 'size-64',
  };

  return (
    <Avatar className={cn('border', avatarSize[size || 'default'], className)}>
      <AvatarImage src={`${import.meta.env.VITE_BUCKET_HOST}/${id}/avatar.webp`} />
      <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
    </Avatar>
  );
}
