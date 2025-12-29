'use client';

import { refreshToken } from '@/apis/client/auth';
import { extendClientAPIConfig } from '@/apis/client/instance';
import { ErrorMessage } from '@/constants/messages';
import { authResponseSchema } from '@/schemas/auth';
import { createContext, useEffect, useRef, useState } from 'react';

type AuthState =
  | { status: 'loading'; session: Session | undefined }
  | { status: 'unauthenticated'; session?: undefined }
  | { status: 'authenticated'; session: Session };

type AuthContextProps = AuthState & {
  updateSession: (session: Session) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  status: 'unauthenticated',
  session: undefined,
  updateSession: () => {},
});

const ACCESS_TOKEN_EXPIRATION = 10 * 60 * 1000; // 10 minutes
const REFRESH_INTERVAL = ACCESS_TOKEN_EXPIRATION - 1 * 60 * 1000; // 1 minute before expiration

export default function AuthProvider({
  initialSession,
  children,
}: Readonly<{ initialSession?: Session; children: React.ReactNode }>) {
  const initialState: AuthState = initialSession
    ? { status: 'loading', session: initialSession }
    : { status: 'loading', session: undefined };
  const [state, setState] = useState<AuthState>(initialState);
  const refreshingRef = useRef(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const handleAccessTokenGenerated = (event: Event) => {
      const customEvent = event as CustomEvent<{ token: string; session: Session }>;
      const { data, success, error } = authResponseSchema.safeParse(customEvent.detail);

      if (!success) {
        console.error('Invalid token/session data received:', error);
        return;
      }

      const { token, session } = data;
      extendClientAPIConfig({ headers: { Authorization: `Bearer ${token}` } });
      setState({ status: 'authenticated', session });
    };
    const handleRefreshFailed = () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
      setState({ status: 'unauthenticated' });
    };
    const handleLoggedOut = () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
      setState({ status: 'unauthenticated' });
    };

    window.addEventListener('auth:access-token-generated', handleAccessTokenGenerated);
    window.addEventListener('auth:refresh-failed', handleRefreshFailed);
    window.addEventListener('auth:logged-out', handleLoggedOut);

    refreshingRef.current = true;
    refreshToken()
      .then(({ message }) => console.info(message))
      .catch(() => console.info(ErrorMessage.REFRESH_TOKEN_FAILED))
      .finally(() => (refreshingRef.current = false));

    return () => {
      window.removeEventListener('auth:logged-out', handleLoggedOut);
      window.removeEventListener('auth:refresh-failed', handleRefreshFailed);
      window.removeEventListener('auth:access-token-generated', handleAccessTokenGenerated);
    };
  }, []);

  useEffect(() => {
    if (state.status !== 'authenticated') return;

    const intervalId = setInterval(() => {
      if (refreshingRef.current) return;

      refreshingRef.current = true;
      refreshToken()
        .then(({ message }) => console.info(message))
        .catch(() => console.info(ErrorMessage.REFRESH_TOKEN_FAILED))
        .finally(() => (refreshingRef.current = false));
    }, REFRESH_INTERVAL);

    refreshIntervalRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
    };
  }, [state.status]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateSession: (session: Session) => {
          if (state.status === 'authenticated') {
            setState({ status: 'authenticated', session });
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
