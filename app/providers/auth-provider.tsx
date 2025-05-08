import { createContext, useCallback, useEffect, useState } from 'react';
import { refreshToken } from '~/apis/client/auth';

type AuthContextType = Readonly<{
  status: AuthStatus;
  session: Session | undefined;
  registerSession: (status: Session) => void;
  unregisterSession: () => void;
}>;

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<Session | undefined>(undefined);

  const registerSession = useCallback((session: Session) => {
    setSession(session);
    setStatus('authenticated');
  }, []);

  const unregisterSession = useCallback(() => {
    setSession(undefined);
    setStatus('unauthenticated');
  }, []);

  useEffect(() => {
    refreshToken().then(registerSession).catch(unregisterSession);
  }, [registerSession, unregisterSession]);

  return (
    <AuthContext.Provider value={{ status, session, registerSession, unregisterSession }}>
      {children}
    </AuthContext.Provider>
  );
}
