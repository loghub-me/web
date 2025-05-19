import { ChevronUpIcon, LogOutIcon, PencilIcon, SettingsIcon, StarIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserInline } from '~/components/users';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

interface MemberNavProps {
  type: 'header' | 'sidebar';
}

export default function MemberNav({ type }: MemberNavProps) {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const triggerVariant = type === 'header' ? (open ? 'secondary' : 'ghost') : open ? 'outline' : 'outline';

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
          <Button variant="ghost" className="justify-start" asChild>
            <Link to={`/@${session.username}`}>
              <UserIcon /> 프로필
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link to={`/@${session.username}/stars`}>
              <StarIcon /> 스타
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link to={'/post'}>
              <PencilIcon /> 글쓰기
            </Link>
          </Button>
          <DropdownMenuSeparator />
          <Button variant="ghost" className="justify-start" asChild>
            <Link to={'/settings'}>
              <SettingsIcon /> 설정
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link to={'/logout'}>
              <LogOutIcon /> 로그아웃
            </Link>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
