import { GlobeLockIcon, IdCardIcon, UserRoundPenIcon } from 'lucide-react';
import SettingHeaderNavLink from '~/components/settings/header/nav-link';

const navLinks = [
  { name: '계정', to: '/settings/account', icon: IdCardIcon },
  { name: '프로필', to: '/settings/profile', icon: UserRoundPenIcon },
  { name: '개인정보', to: '/settings/privacy', icon: GlobeLockIcon },
];

export default function SettingHeader() {
  return (
    <header className="pt-8 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">설정</h2>
        <p className="text-muted-foreground text-sm">계정, 프로필, 개인정보 등 설정을 관리할 수 있습니다.</p>
      </div>
      <nav className="flex items-center gap-2">
        {navLinks.map((navLink) => (
          <SettingHeaderNavLink key={navLink.to} {...navLink} />
        ))}
      </nav>
    </header>
  );
}
