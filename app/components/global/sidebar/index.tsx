import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import Logo from '~/components/global/logo';
import SidebarAuthMenu from '~/components/global/sidebar/auth-menu';
import { Button, ButtonNavLink } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { SEARCH_LINKS } from '~/constants/nav-links';

export default function GlobalSidebar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className="inline-flex md:hidden lg:hidden px-2.5 rounded-full">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetTitle className="p-6">
          <Link to={'/'}>
            <Logo />
          </Link>
        </SheetTitle>
        <hr className="mx-6" />
        <nav className="px-6 py-4 flex flex-col gap-2">
          {SEARCH_LINKS.map(({ name, to, icon: Icon }) => (
            <ButtonNavLink key={to} to={to} className="justify-start">
              <Icon /> {name}
            </ButtonNavLink>
          ))}
        </nav>
        <nav className="absolute bottom-0 w-full p-6">
          <SidebarAuthMenu />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
