import { LogInIcon } from 'lucide-react';
import { Link } from 'react-router';
import MemberNav from '~/components/global/member-nav';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useAuth } from '~/hooks/use-auth';

export default function SideAuthMenu() {
  const { status } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className="w-full h-9 rounded-md" />;
    case 'unauthenticated':
      return <GuestNav />;
    case 'authenticated':
      return <MemberNav type="sidebar" />;
  }
}

function GuestNav() {
  return (
    <Button variant={'default'} className="" asChild>
      <Link to={'/login'}>
        <LogInIcon /> 로그인
      </Link>
    </Button>
  );
}
