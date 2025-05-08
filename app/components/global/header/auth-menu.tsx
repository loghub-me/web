import { UserInline } from 'app/components/users';
import { ChevronUpIcon, LogInIcon, PencilIcon, SettingsIcon, StarIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Skeleton } from '~/components/ui/skeleton';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

export default function HeaderAuthMenu() {
  const { status } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className="w-24 h-9 rounded-md" />;
    case 'unauthenticated':
      return <GuestNav />;
    case 'authenticated':
      return <MemberNav />;
  }
}

function GuestNav() {
  return (
    <Button variant={'default'} className="hidden md:inline-flex lg:inline-flex" asChild>
      <Link to={'/login'}>
        <LogInIcon /> 로그인
      </Link>
    </Button>
  );
}

function MemberNav() {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    session && (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="hidden md:flex" asChild>
          <Button type="button" variant="outline" className="w-full h-11 justify-between cursor-pointer">
            <UserInline username={session.username} />
            <ChevronUpIcon className={cn('transition-transform', open && '-rotate-180')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Button variant={'ghost'} className="w-full justify-start">
              <UserIcon /> 프로필
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant={'ghost'} className="w-full justify-start">
              <StarIcon /> 스타
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button variant={'ghost'} className="w-full justify-start">
              <PencilIcon /> 글쓰기
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button variant={'ghost'} className="w-full justify-start">
              <SettingsIcon /> 설정
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
