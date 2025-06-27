import { ChevronUpIcon, LogOutIcon, PencilIcon, SettingsIcon, StarIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { logout } from '~/apis/client/auth';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserInline } from '~/components/users';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';

interface MemberNavProps {
  type: 'header' | 'sidebar';
  closeSheet?: () => void;
}

export default function MemberNav({ type, closeSheet }: MemberNavProps) {
  const { session, unregisterSession } = useAuth();
  const [open, setOpen] = useState(false);
  const triggerVariant = type === 'header' ? (open ? 'secondary' : 'ghost') : open ? 'outline' : 'outline';

  const navLinks = [
    { to: `/@${session?.username}`, name: '프로필', icon: UserIcon },
    { to: `/@${session?.username}/stars`, name: '스타', icon: StarIcon },
    { to: '/post', name: '작성', icon: PencilIcon },
    { to: '/settings', name: '설정', icon: SettingsIcon },
  ];

  function onClickLink() {
    setOpen(false);
    if (type === 'sidebar' && closeSheet) {
      closeSheet();
    }
  }

  function onClickLogout() {
    logout()
      .then(({ message }) => {
        unregisterSession();
        setOpen(false);
        toast.success(message);
      })
      .catch(handleMessageError);
  }

  return (
    session && (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={cn(type === 'header' && 'hidden md:flex')} asChild>
          <Button type="button" variant={triggerVariant} className="w-full h-11 justify-between cursor-pointer">
            <UserInline username={session.username} />
            {type === 'sidebar' && <ChevronUpIcon className={cn('transition-transform', open && '-rotate-180')} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('flex flex-col', type === 'sidebar' && 'w-xs')}>
          {navLinks.map(({ to, name, icon: Icon }) => (
            <Button key={to} variant="ghost" className="justify-start" asChild>
              <Link to={to} onClick={onClickLink}>
                <Icon /> {name}
              </Link>
            </Button>
          ))}
          <DropdownMenuSeparator />
          <Button variant="ghost" className="justify-start" onClick={onClickLogout}>
            <LogOutIcon /> 로그아웃
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
