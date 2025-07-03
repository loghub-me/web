import { LogInIcon } from 'lucide-react';
import MemberNav from '~/components/global/member-nav';
import { ButtonLink } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useAuth } from '~/hooks/use-auth';

export default function HeaderAuthMenu() {
  const { status } = useAuth();

  switch (status) {
    case 'loading':
      return <Skeleton className="w-24 h-9 rounded-md" />;
    case 'unauthenticated':
      return <GuestNav />;
    case 'authenticated':
      return <MemberNav type="header" />;
  }
}

function GuestNav() {
  return (
    <ButtonLink to={'/login'} variant={'default'} className={'hidden md:inline-flex'}>
      <LogInIcon /> 로그인
    </ButtonLink>
  );
}
