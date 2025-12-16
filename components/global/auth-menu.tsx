'use client';

import { logout } from '@/apis/client/auth';
import { UserAvatar } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Skeleton } from '@ui/skeleton';
import {
  ChevronUpIcon,
  GlobeLockIcon,
  LogInIcon,
  LogOutIcon,
  NotepadTextIcon,
  PencilIcon,
  SettingsIcon,
  StarIcon,
  UserCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

interface AuthMenuProps {
  type: 'header' | 'sheet';
  closeSheet?: () => void;
}

export default function AuthMenu({ type, closeSheet }: Readonly<AuthMenuProps>) {
  const { status, session } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className={cn('h-9', type === 'header' ? 'w-24' : 'flex-1')} />;
    case 'unauthenticated':
      return <GuestMenu type={type} closeSheet={closeSheet} />;
    case 'authenticated':
      return <MemberMenu type={type} session={session} closeSheet={closeSheet} />;
  }
}

function GuestMenu({ type, closeSheet }: Readonly<AuthMenuProps>) {
  return (
    <ButtonLink
      href={'/login'}
      variant={'default'}
      className={cn(type === 'sheet' && 'flex-1')}
      onNavigate={closeSheet}
    >
      <LogInIcon /> 로그인
    </ButtonLink>
  );
}

function MemberMenu({ type, session, closeSheet }: Readonly<AuthMenuProps & { session: Session }>) {
  const [open, setOpen] = useState(false);
  const { unregisterSession } = useAuth();

  const navLinks = [
    [{ href: `/${session?.username}`, label: '프로필', icon: UserCircleIcon }],
    [
      { href: `/post`, label: '포스트', icon: PencilIcon },
      {
        label: '비공개',
        icon: GlobeLockIcon,
        sub: [{ href: '/unpublished/articles', label: '비공개 아티클', icon: NotepadTextIcon }],
      },
      { href: `/${session?.username}/stars`, label: '스타', icon: StarIcon },
      { href: '/settings', label: '설정', icon: SettingsIcon },
    ],
  ];

  function onClickLogout() {
    logout()
      .then(({ message }) => toast.info(message))
      .catch(handleError)
      .finally(unregisterSession);
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            variant={open ? 'secondary' : 'outline'}
            className={cn('has-[>svg]:px-1.5 border', type === 'sheet' && 'flex-1')}
          />
        }
      >
        <UserAvatar {...session} /> {session.username}
        <ChevronUpIcon
          className={cn(
            'ml-auto transition-transform',
            type === 'header' ? open && '-rotate-180' : !open && 'rotate-180'
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('flex flex-col gap-1', type === 'sheet' && 'w-52')}>
        {navLinks.map((group, index) => (
          <Fragment key={index}>
            {group.map(({ href, sub, label, icon: Icon }) => {
              if (href) {
                return (
                  <DropdownMenuItem
                    key={label}
                    render={<Link href={href} prefetch={false} onNavigate={closeSheet} className="justify-start" />}
                  >
                    <Icon /> {label}
                  </DropdownMenuItem>
                );
              }
              if (sub) {
                return (
                  <DropdownMenuSub key={label}>
                    <DropdownMenuSubTrigger>
                      <Icon className="size-4" /> {label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="flex flex-col">
                        {sub.map(({ href: subHref, label: subLabel, icon: SubIcon }) => (
                          <DropdownMenuItem
                            key={subLabel}
                            render={
                              <Link href={subHref} prefetch={false} onNavigate={closeSheet} className="justify-start" />
                            }
                          >
                            <SubIcon className="size-4" /> {subLabel}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                );
              }
            })}
            <DropdownMenuSeparator />
          </Fragment>
        ))}
        <DropdownMenuItem className="justify-start" onClick={onClickLogout}>
          <LogOutIcon /> 로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
