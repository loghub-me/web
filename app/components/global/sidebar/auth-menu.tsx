import { LogInIcon } from 'lucide-react';
import MemberNav from '~/components/global/member-nav';
import { ButtonLink } from '~/components/ui/button';
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
    <ButtonLink to={'/login'} variant={'default'} className="w-full">
      <LogInIcon /> 로그인
    </ButtonLink>
  );
}
