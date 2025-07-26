import { BotIcon, ShieldUserIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

interface UserRoleBadgeProps {
  role: UserRole;
}

export default function UserRoleBadge({ role }: Readonly<UserRoleBadgeProps>) {
  const className = 'p-0 size-6';

  switch (role) {
    case 'MEMBER':
      return;
    case 'BOT':
      return (
        <Badge variant={'outline'} className={className}>
          <BotIcon />
        </Badge>
      );
    case 'ADMIN':
      return (
        <Badge variant={'outline'} className={className}>
          <ShieldUserIcon />
        </Badge>
      );
  }
}
