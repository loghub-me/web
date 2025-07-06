import { SunIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/hooks/use-theme';

export default function UserThemeUpdateEdit() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-4">
      <Button variant={'outline'} disabled={theme === 'light'} onClick={() => setTheme('light')}>
        <SunIcon /> 라이트
      </Button>
      <Button variant={'outline'} disabled={theme === 'dark'} onClick={() => setTheme('dark')}>
        <SunIcon /> 다크
      </Button>
    </div>
  );
}
