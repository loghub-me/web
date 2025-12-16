'use client';

import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';
import { usePathname } from 'next/navigation';

interface SheetNavLinkProps {
  href: string;
  matchPaths?: string[];
  children?: React.ReactNode;
  closeSheet: () => void;
}

export default function SheetNavLink({ href, matchPaths, closeSheet, children }: Readonly<SheetNavLinkProps>) {
  const pathname = usePathname();
  const active = pathname.startsWith(href) || matchPaths?.some((path) => pathname.startsWith(path));

  return (
    <ButtonLink
      href={href}
      variant={active ? 'secondary' : 'ghost'}
      className={cn(
        'font-semibold hover:text-primary justify-start',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
      onNavigate={closeSheet}
    >
      {children}
    </ButtonLink>
  );
}
