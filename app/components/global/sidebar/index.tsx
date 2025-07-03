import { BookIcon, FileQuestionIcon, MenuIcon, PaperclipIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Logo from '~/components/global/logo';
import SidebarAuthMenu from '~/components/global/sidebar/auth-menu';
import { Button, ButtonNavLink } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '~/components/ui/sheet';

export const navLinks = [
  { name: '아티클', to: '/search/articles', icon: PaperclipIcon },
  { name: '도서', to: '/search/books', icon: BookIcon },
  { name: '질문', to: '/search/questions', icon: FileQuestionIcon },
];

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
          <Logo />
        </SheetTitle>
        <hr className="mx-6 my-2" />
        <nav className="px-6 py-4 flex flex-col gap-2">
          {navLinks.map(({ name, to, icon: Icon }) => (
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
