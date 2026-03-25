import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { cva, type VariantProps } from 'class-variance-authority';
import { BotIcon, LucideIcon, ShieldUserIcon, UserIcon } from 'lucide-react';

interface UserRoleBadgeProps {
  role: UserRole;
}

const badgeVariants = cva('px-2 h-6 rounded-full', {
  variants: {
    color: {
      ADMIN: 'text-white bg-purple-600/60 dark:bg-purple-500/30',
      MEMBER: 'text-white bg-green-600/60 dark:bg-green-500/30',
      BOT: 'text-white bg-cyan-600/60 dark:bg-cyan-500/30',
    },
  },
  defaultVariants: { color: 'MEMBER' },
});

const USER_ROLE_ICONS: Record<UserRole, { label: string; icon: LucideIcon }> = {
  ADMIN: { label: 'Admin', icon: ShieldUserIcon },
  MEMBER: { label: 'Member', icon: UserIcon },
  BOT: { label: 'Bot', icon: BotIcon },
};

export default function UserRoleBadge({
  role,
  color,
}: Readonly<UserRoleBadgeProps & VariantProps<typeof badgeVariants>>) {
  const { label, icon: Icon } = USER_ROLE_ICONS[role];

  return (
    <Badge variant={'outline'} className={cn(badgeVariants({ color }))}>
      <Icon /> {label}
    </Badge>
  );
}
