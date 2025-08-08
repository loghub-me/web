import { useEffect, useRef, useState } from 'react';
import { Form, useLocation } from 'react-router';
import { useTheme } from '~/actions/theme/utils';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { THEME_OPTIONS } from '~/constants/options';

export function HeaderThemeMenu() {
  const { pathname, search } = useLocation();
  const theme = useTheme();
  const ThemeIcon = THEME_OPTIONS[theme].icon;
  const formRef = useRef<HTMLFormElement>(null);
  const [themeValue, setThemeValue] = useState(theme);

  useEffect(() => {
    if (themeValue !== theme) {
      formRef.current?.requestSubmit();
    }
  }, [theme, themeValue, setThemeValue]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="inline-flex">
          <ThemeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-auto">
        <Form replace action={'/theme'} ref={formRef} method="post" className="flex flex-col gap-1">
          <input type="hidden" name="returnTo" value={`${pathname}${search}`} />
          <input type="hidden" name="theme" value={themeValue} />
          {Object.entries(THEME_OPTIONS).map(([key, { icon: Icon }]) => (
            <Button
              key={key}
              variant={themeValue === key ? 'secondary' : 'ghost'}
              size={'icon'}
              disabled={themeValue === key}
              onClick={() => setThemeValue(key as Theme)}
            >
              <Icon />
            </Button>
          ))}
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
