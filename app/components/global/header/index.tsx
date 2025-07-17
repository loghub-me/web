import { Link } from 'react-router';
import HeaderAuthMenu from '~/components/global/header/auth-menu';
import HeaderNavLink from '~/components/global/header/nav-link';
import Logo from '~/components/global/logo';
import GlobalSidebar from '~/components/global/sidebar';
import { SEARCH_LINKS } from '~/constants/nav-links';

export default function GlobalHeader() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full h-16 border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center gap-8">
        <Link to={'/'}>
          <Logo />
        </Link>
        <nav className="md:flex hidden gap-6">
          {SEARCH_LINKS.map((navLink) => (
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
