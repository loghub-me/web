'use client';

import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';
import { usePathname } from 'next/navigation';

interface HeaderNavLinkProps {
  href: string;
  matchPaths?: string[];
  children?: React.ReactNode;
}

export default function HeaderNavLink({ href, matchPaths, children }: Readonly<HeaderNavLinkProps>) {
  const pathname = usePathname();
  const active = pathname.startsWith(href) || matchPaths?.some((path) => pathname.startsWith(path));

  return (
    <ButtonLink
      href={href}
      variant={active ? 'secondary' : 'ghost'}
      size={'sm'}
      className={cn(
        'font-semibold hover:text-primary hidden md:flex has-[>svg]:px-2',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {children}
    </ButtonLink>
  );
}
