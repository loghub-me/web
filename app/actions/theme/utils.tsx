import { useLayoutEffect, useMemo } from 'react';
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
