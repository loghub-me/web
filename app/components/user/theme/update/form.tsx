import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Form, useLocation } from 'react-router';
import { useTheme } from '~/actions/theme/utils';
import { Button } from '~/components/ui/button';

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
      <Button variant={'outline'} disabled={theme === 'system'} onClick={() => setThemeValue('system')}>
        <MonitorIcon /> 시스템
      </Button>
      <Button variant={'outline'} disabled={theme === 'light'} onClick={() => setThemeValue('light')}>
        <SunIcon /> 라이트
      </Button>
      <Button variant={'outline'} disabled={theme === 'dark'} onClick={() => setThemeValue('dark')}>
        <MoonIcon /> 다크
      </Button>
    </Form>
  );
}
