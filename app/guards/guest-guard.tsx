import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

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

  return (
    <div className="h-screen" style={{ visibility: status === 'unauthenticated' ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
}
