import { useEffect, useRef, useState } from 'react';
import { Form, useLocation } from 'react-router';
import { useTheme } from '~/actions/theme/utils';
import { Button } from '~/components/ui/button';
import { THEME_OPTIONS } from '~/constants/options';

export default function UserThemeUpdateEdit() {
  const { pathname, search } = useLocation();
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [themeValue, setThemeValue] = useState(theme);

  useEffect(() => {
    if (themeValue !== theme) {
      formRef.current?.requestSubmit();
    }
  }, [theme, themeValue, setThemeValue]);

  return (
    <Form replace action={'/theme'} ref={formRef} method="post" className="flex gap-2">
      <input type="hidden" name="returnTo" value={`${pathname}${search}`} />
      <input type="hidden" name="theme" value={themeValue} />
      {Object.entries(THEME_OPTIONS).map(([key, { icon: Icon, label }]) => (
        <Button key={key} variant={'outline'} disabled={themeValue === key} onClick={() => setThemeValue(key as Theme)}>
          <Icon /> {label}
        </Button>
      ))}
    </Form>
  );
}
