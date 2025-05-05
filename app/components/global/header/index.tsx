import HeaderAuthMenu from '~/components/global/header/auth-menu';
import HeaderNavLink from '~/components/global/header/nav-link';
import Logo from '~/components/global/logo';
import GlobalSidebar from '~/components/global/sidebar';
import { headerNavLinks } from '~/constants/header-nav-links';

export default function GlobalHeader() {
  return (
    <header className="absolute top-0 left-0 w-full h-14 border-b">
      <div className="container mx-auto px-4 h-14 flex items-center gap-8">
        <Logo />
        <nav className="md:flex hidden gap-4">
          {headerNavLinks.map((navLink) => (
            <HeaderNavLink key={navLink.to} {...navLink} />
          ))}
        </nav>
        <nav className="flex gap-4 ml-auto">
          <HeaderAuthMenu />
          <GlobalSidebar />
        </nav>
      </div>
    </header>
  );
}
