import { ChevronUpIcon, LogOutIcon, PencilIcon, SettingsIcon, StarIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';
import { logout } from '~/apis/client/auth';
import { Button, ButtonLink } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserInline } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';

interface MemberNavProps {
  type: 'header' | 'sidebar';
}

export default function MemberNav({ type }: MemberNavProps) {
  const [open, setOpen] = useState(false);
  const { session, unregisterSession } = useAuth();
  const { pathname } = useLocation();
  const triggerVariant = type === 'header' ? (open ? 'secondary' : 'ghost') : open ? 'outline' : 'outline';

  const navLinks = [
    { to: `/@${session?.username}`, name: '프로필', icon: UserIcon },
    { to: `/@${session?.username}/stars`, name: '스타', icon: StarIcon },
    { to: '/post', name: '작성', icon: PencilIcon },
    { to: '/settings', name: '설정', icon: SettingsIcon },
  ];

  function onClickLogout() {
    logout()
      .then(({ message }) => {
        unregisterSession();
        setOpen(false);
        toast.success(message);
      })
      .catch(handleMessageError);
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
            <ButtonLink key={to} to={to} className={'justify-start'}>
              <Icon /> {name}
            </ButtonLink>
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
