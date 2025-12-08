import AuthMenu from '@/components/global/auth-menu';
import GlobalCommandMenu from '@/components/global/command-menu';
import HeaderNavLink from '@/components/global/header/nav-link';
import GlobalNotification from '@/components/global/notification';
import GlobalSheet from '@/components/global/sheet';
import Symbol from '@/components/global/symbol';
import ThemeSwitch from '@/components/global/theme-switch';
import { HEADER_LINKS } from '@/constants/links';
import { ButtonGroup } from '@ui/button-group';
import Link from 'next/link';

export default function GlobalHeader() {
  return (
    <header className="absolute z-10 top-0 left-0 w-full h-16 bg-background/40 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center gap-4 h-full px-4">
        <Link href={'/'} className="transition-opacity hover:opacity-70">
          <Symbol size={36} />
        </Link>
        <nav className="flex-1 flex items-center gap-1">
          {HEADER_LINKS.map(({ href, matchPaths, label, icon: Icon }) => (
            <HeaderNavLink key={href} matchPaths={matchPaths} href={href}>
              <Icon /> {label}
            </HeaderNavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 ml-0 h-full">
          <GlobalCommandMenu />
          <ButtonGroup>
            <ThemeSwitch />
            <GlobalNotification />
          </ButtonGroup>
          <AuthMenu type={'header'} />
        </div>
        <div className="flex md:hidden items-center gap-1 ml-0 h-full">
          <GlobalSheet />
        </div>
      </div>
    </header>
  );
}
