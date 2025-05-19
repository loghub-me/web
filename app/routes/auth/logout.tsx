import { useEffect } from 'react';
import { toast } from 'sonner';
import { logout } from '~/apis/client/auth';
import { ErrorMessage } from '~/constants/error-messages';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';

export default function LogoutRoute() {
  const { status, unregisterSession } = useAuth();

  useEffect(() => {
    switch (status) {
      case 'loading':
        return;
      case 'unauthenticated':
        toast.error(ErrorMessage.ALREADY_LOGGED_OUT);
        return;
      case 'authenticated':
        logout()
          .then(({ message }) => {
            unregisterSession();
            toast.success(message);
          })
          .catch(handleMessageError);
    }
  }, [status]);

  return <main />;
}
