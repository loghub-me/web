import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: Readonly<GuestGuardProps>) {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/');
    }
  }, [status, navigate]);

  return <div className={cn(status === 'unauthenticated' ? 'visible' : 'invisible')}>{children}</div>;
}
