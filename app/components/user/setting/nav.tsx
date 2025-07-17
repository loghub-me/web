import { ButtonNavLink } from '~/components/ui/button';
import { SETTING_LINKS } from '~/constants/nav-links';

export default function UserSettingNav() {
  return (
    <header className="pt-8 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">설정</h2>
        <p className="text-muted-foreground text-sm">계정, 프로필, 개인정보 등 설정을 관리할 수 있습니다.</p>
      </div>
      <nav className="flex items-center gap-2">
        {SETTING_LINKS.map(({ name, to, icon: Icon }) => (
          <ButtonNavLink key={to} to={to} end>
            <Icon /> {name}
          </ButtonNavLink>
        ))}
      </nav>
    </header>
  );
}
