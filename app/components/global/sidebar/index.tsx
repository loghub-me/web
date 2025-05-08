import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import Logo from '~/components/global/logo';
import SidebarAuthMenu from '~/components/global/sidebar/auth-menu';
import SidebarNavLink from '~/components/global/sidebar/nav-link';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { navLinks } from '~/constants/nav-links';

export default function GlobalSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className="inline-flex md:hidden lg:hidden px-2.5 rounded-full">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 pt-6">
        <SheetTitle>
          <Logo />
        </SheetTitle>
        <hr className="my-2" />
        <nav className="flex flex-col gap-2">
          {navLinks.map((navLink) => (
            <SidebarNavLink key={navLink.to} {...navLink} closeSheet={closeSheet} />
          ))}
        </nav>
        <hr className="my-2" />
        <SidebarAuthMenu />
      </SheetContent>
    </Sheet>
  );
}
