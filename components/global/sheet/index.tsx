'use client';

import AuthMenu from '@/components/global/auth-menu';
import GlobalNotification from '@/components/global/notification';
import SheetNavLink from '@/components/global/sheet/nav-link';
import Symbol from '@/components/global/symbol';
import ThemeSwitch from '@/components/global/theme-switch';
import { HEADER_LINKS } from '@/constants/links';
import { Button } from '@ui/button';
import { ButtonGroup } from '@ui/button-group';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function GlobalSheet() {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-16 border-b">
          <SheetTitle asChild>
            <Link href={'/'} className="transition-opacity hover:opacity-70" onNavigate={closeSheet}>
              <Symbol size={36} />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="px-4 flex flex-col gap-1">
          {HEADER_LINKS.map(({ href, matchPaths, label, icon: Icon }) => (
            <SheetNavLink key={href} href={href} matchPaths={matchPaths} closeSheet={closeSheet}>
              <Icon /> {label}
            </SheetNavLink>
          ))}
        </nav>
        <SheetFooter className="flex-row">
          <ButtonGroup>
            <ThemeSwitch />
            <GlobalNotification />
          </ButtonGroup>
          <AuthMenu type={'sheet'} closeSheet={closeSheet} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
