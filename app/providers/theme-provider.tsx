import React, { createContext, useCallback, useEffect, useState } from 'react';

type ThemeContextType = Readonly<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>;

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setThemeState] = useState<Theme>('light');

  const setTheme = useCallback((theme: Theme) => {
    localStorage.setItem('theme', theme);
    setThemeState(theme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, [setThemeState]);

  useEffect(() => {
    switch (theme) {
      case 'light':
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        break;
      case 'dark':
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
