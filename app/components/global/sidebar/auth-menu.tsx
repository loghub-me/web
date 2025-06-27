import { LogInIcon } from 'lucide-react';
import { Link } from 'react-router';
import MemberNav from '~/components/global/member-nav';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useAuth } from '~/hooks/use-auth';

interface SideAuthMenuProps {
  closeSheet: () => void;
}

export default function SideAuthMenu({ closeSheet }: Readonly<SideAuthMenuProps>) {
  const { status } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className="w-full h-9 rounded-md" />;
    case 'unauthenticated':
      return <GuestNav />;
    case 'authenticated':
      return <MemberNav type="sidebar" closeSheet={closeSheet} />;
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
