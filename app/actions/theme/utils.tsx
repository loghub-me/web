import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigation, useRouteLoaderData } from 'react-router';
import type { loader as rootLoader } from '~/root';

export function getTheme(formData: FormData): Theme | null {
  const theme = formData.get('theme');

  if (theme === 'dark' || theme === 'light' || theme === 'system') {
    return theme;
  }

  return null;
}

export function useTheme(): Theme {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>('root');
  if (!rootLoaderData) {
    throw new Error('useTheme must be used within a root loader');
  }

  const { formData } = useNavigation();
  const optimisticTheme = formData ? getTheme(formData) : null;
  return optimisticTheme || rootLoaderData.theme;
}

/**
 * Resolve a Theme value to a concrete "light" or "dark".
 * If the incoming theme is "system", it reads the current prefers-color-scheme
 * and subscribes to changes to keep the value in sync.
 */
export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useTheme();

  // Helper to read system preference safely (SSR safe)
  const getSystem = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [resolved, setResolved] = useState<'light' | 'dark'>(() => (theme === 'system' ? getSystem() : theme));

  useEffect(() => {
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setResolved(e.matches ? 'dark' : 'light');

      // set initial value
      setResolved(media.matches ? 'dark' : 'light');

      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    } else {
      setResolved(theme);
    }
  }, [theme]);

  return resolved;
}

export function ThemeScript() {
  const theme = useTheme();

  const script = useMemo(
    () => `
      const theme = ${JSON.stringify(theme)};
      if (theme === "system") {
        const media = window.matchMedia("(prefers-color-scheme: dark)")
        if (media.matches) document.documentElement.classList.add("dark");
      }
    `,
    [] // eslint-disable-line
    // we don't want this script to ever change
  );

  if (typeof document !== 'undefined') {
    // eslint-disable-next-line
    useLayoutEffect(() => {
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'system') {
        function check(media: MediaQueryList | MediaQueryListEvent) {
          if (media.matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        check(media);

        media.addEventListener('change', check);
        return () => media.removeEventListener('change', check);
      } else {
        console.error('Impossible color scheme state:', theme);
      }
    }, [theme]);
  }

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
