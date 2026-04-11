'use client';

import { createContext, useCallback, useEffect, useRef } from 'react';

type ExitGuardContextProps = {
  disableExitGuard: () => void;
};

type NavigateEventLike = Event & {
  hashChange?: boolean;
};

type NavigationLike = EventTarget;

export const ExitGuardContext = createContext<ExitGuardContextProps>({
  disableExitGuard: () => {},
});

const EXIT_CONFIRM_MESSAGE = '정말로 페이지를 떠나시겠습니까? 작성 중인 내용이 저장되지 않을 수 있습니다.';

function getNavigatingLink(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return null;
  }

  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link || link.target === '_blank' || link.hasAttribute('download')) {
    return null;
  }

  const destination = new URL(link.href, window.location.href);
  const current = new URL(window.location.href);
  const isHashOnlyChange =
    destination.origin === current.origin &&
    destination.pathname === current.pathname &&
    destination.search === current.search &&
    destination.hash !== current.hash;

  return destination.href === current.href || isHashOnlyChange ? null : link;
}

export default function ExitGuard({ children }: { children: React.ReactNode }) {
  const disabledRef = useRef(false);
  const bypassRef = useRef(false);
  const bypassTimeoutRef = useRef<number>(0);
  const recentDecisionRef = useRef<boolean | null>(null);
  const recentDecisionTimeoutRef = useRef<number>(0);
  const ignoreNextPopStateRef = useRef(false);

  const disableExitGuard = useCallback(() => {
    disabledRef.current = true;
  }, []);

  useEffect(() => {
    const bypassOnce = () => {
      bypassRef.current = true;
      window.clearTimeout(bypassTimeoutRef.current);
      bypassTimeoutRef.current = window.setTimeout(() => {
        bypassRef.current = false;
      }, 0);
    };

    const cacheDecision = (decision: boolean) => {
      recentDecisionRef.current = decision;
      window.clearTimeout(recentDecisionTimeoutRef.current);
      recentDecisionTimeoutRef.current = window.setTimeout(() => {
        recentDecisionRef.current = null;
      }, 150);

      return decision;
    };

    const confirmExit = () => {
      if (disabledRef.current || bypassRef.current) return true;
      if (recentDecisionRef.current !== null) {
        return recentDecisionRef.current;
      }

      const shouldLeave = window.confirm(EXIT_CONFIRM_MESSAGE);
      if (shouldLeave) {
        bypassOnce();
      }

      return cacheDecision(shouldLeave);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (disabledRef.current || bypassRef.current) {
        return;
      }

      event.preventDefault();
      event.returnValue = true;
    };

    const handleNavigate = (event: Event) => {
      const navigateEvent = event as NavigateEventLike;

      if (navigateEvent.hashChange || !navigateEvent.cancelable) {
        return;
      }

      if (!confirmExit()) {
        navigateEvent.preventDefault();
      }
    };

    const handlePopState = () => {
      if (disabledRef.current) {
        return;
      }

      if (ignoreNextPopStateRef.current) {
        ignoreNextPopStateRef.current = false;
        return;
      }

      if (confirmExit()) {
        return;
      }

      ignoreNextPopStateRef.current = true;
      window.history.forward();
    };

    const handleClick = (event: MouseEvent) => {
      if (!getNavigatingLink(event)) {
        return;
      }

      if (!confirmExit()) {
        event.preventDefault();
      }
    };

    const navigation = (window as Window & { navigation?: NavigationLike }).navigation;

    window.addEventListener('beforeunload', handleBeforeUnload);
    if (navigation) {
      navigation.addEventListener('navigate', handleNavigate);
    } else {
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('click', handleClick, true);
    }

    return () => {
      window.clearTimeout(bypassTimeoutRef.current);
      window.clearTimeout(recentDecisionTimeoutRef.current);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (navigation) {
        navigation.removeEventListener('navigate', handleNavigate);
      } else {
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('click', handleClick, true);
      }
    };
  }, []);

  return <ExitGuardContext.Provider value={{ disableExitGuard }}>{children}</ExitGuardContext.Provider>;
}
