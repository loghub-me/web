import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Readonly<AuthGuardProps>) {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/login');
    }
  }, [status, navigate]);

  return <div className={cn(status === 'authenticated' ? 'visible' : 'invisible')}>{children}</div>;
}
