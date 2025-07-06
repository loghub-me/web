import { GlobeLockIcon, IdCardIcon, PaintbrushIcon, UserRoundPenIcon } from 'lucide-react';
import { ButtonNavLink } from '~/components/ui/button';

const navLinks = [
  { name: '계정', to: '/settings/account', icon: IdCardIcon },
  { name: '프로필', to: '/settings/profile', icon: UserRoundPenIcon },
  { name: '개인정보', to: '/settings/privacy', icon: GlobeLockIcon },
  { name: '테마', to: '/settings/theme', icon: PaintbrushIcon },
];

export default function UserSettingNav() {
  return (
    <header className="pt-8 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">설정</h2>
        <p className="text-muted-foreground text-sm">계정, 프로필, 개인정보 등 설정을 관리할 수 있습니다.</p>
      </div>
      <nav className="flex items-center gap-2">
        {navLinks.map(({ name, to, icon: Icon }) => (
          <ButtonNavLink key={to} to={to} end>
            <Icon /> {name}
          </ButtonNavLink>
        ))}
      </nav>
    </header>
  );
}
