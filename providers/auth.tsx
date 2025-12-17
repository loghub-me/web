'use client';

import { refreshToken } from '@/apis/client/auth';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

type AuthState =
  | { status: 'loading'; session?: undefined }
  | { status: 'unauthenticated'; session?: undefined }
  | { status: 'authenticated'; session: Session };

type AuthContextProps = AuthState & {
  registerSession: (session: Session) => void;
  unregisterSession: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  status: 'unauthenticated',
  session: undefined,
  registerSession: () => {},
  unregisterSession: () => {},
});

const ACCESS_TOKEN_EXPIRATION = 10 * 60 * 1000; // 10 minutes
const REFRESH_INTERVAL = ACCESS_TOKEN_EXPIRATION - 1 * 60 * 1000; // 1 minute before expiration

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const refreshingRef = useRef(false);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleTokenRefresh = useCallback(() => {
    clearTimeoutRef();

    timeoutRef.current = setTimeout(() => {
      if (refreshingRef.current) return;
      refreshingRef.current = true;

      refreshToken()
        .then(({ body, session }) => {
          console.info(body.message);
          setState({ status: 'authenticated', session });

          // eslint-disable-next-line react-hooks/immutability
          scheduleTokenRefresh();
        })
        .catch(() => {
          setState({ status: 'unauthenticated' });
          clearTimeoutRef();
        })
        .finally(() => {
          refreshingRef.current = false;
        });
    }, REFRESH_INTERVAL);
  }, []);

  useEffect(() => {
    refreshToken()
      .then(({ body, session }) => {
        console.info(body.message);
        setState({ status: 'authenticated', session });
        scheduleTokenRefresh();
      })
      .catch(() => setState({ status: 'unauthenticated' }));
    return () => {
      clearTimeoutRef();
    };
  }, [scheduleTokenRefresh]);

  useEffect(() => {
    const handleRefreshFailed = () => setState({ status: 'unauthenticated' });

    window.addEventListener('auth:refresh-failed', handleRefreshFailed);

    return () => {
      window.removeEventListener('auth:refresh-failed', handleRefreshFailed);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerSession: (session: Session) => {
          setState({ status: 'authenticated', session });
          scheduleTokenRefresh();
        },
        unregisterSession: () => {
          setState({ status: 'unauthenticated' });
          clearTimeoutRef();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
