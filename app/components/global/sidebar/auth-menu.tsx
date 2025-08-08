import {
  ChevronDownIcon,
  LogInIcon,
  LogOutIcon,
  NotepadTextIcon,
  PencilIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
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
import { Skeleton } from '~/components/ui/skeleton';
import { UserInline } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { cn } from '~/lib/utils';

export default function SideAuthMenu() {
  const { status } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className="w-full h-9 rounded-md" />;
    case 'unauthenticated':
      return <GuestNav />;
    case 'authenticated':
      return <MemberNav />;
  }
}

function GuestNav() {
  return (
    <ButtonLink to={'/login'} variant={'default'} className="w-full">
      <LogInIcon /> 로그인
    </ButtonLink>
  );
}

export function MemberNav() {
  const [open, setOpen] = useState(false);
  const { session, unregisterSession } = useAuth();
  const { pathname } = useLocation();

  const navLinks = [
    { to: `/@${session?.username}`, name: '프로필', icon: UserIcon },
    { to: `/@${session?.username}/stars`, name: '스타', icon: StarIcon },
    { to: '/post', name: '포스트', icon: PencilIcon },
    { to: '/manual', name: '메뉴얼', icon: NotepadTextIcon },
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
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type={'button'}
            variant={open ? 'secondary' : 'ghost'}
            size={'custom'}
            className="px-3 py-2 w-full justify-start border"
          >
            <UserInline {...session} />
            <ChevronDownIcon className={cn('ml-auto transition-transform', open && '-rotate-180')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 flex flex-col w-xs">
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
