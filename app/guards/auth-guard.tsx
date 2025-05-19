import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

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

  return (
    <div className="h-screen" style={{ visibility: status === 'authenticated' ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
}
