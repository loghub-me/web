'use client';

import { ButtonLink } from '@ui/button-link';
import { LayersIcon, LucideIcon, MessagesSquareIcon, NotepadTextIcon, StarIcon, UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface UserDetailNavProps {
  username: string;
}

export default function UserDetailNav({ username }: Readonly<UserDetailNavProps>) {
  const links = [
    { label: '프로필', href: `/${username}`, icon: UserIcon },
    { label: '아티클', href: `/${username}/articles`, icon: NotepadTextIcon },
    { label: '시리즈', href: `/${username}/series`, icon: LayersIcon },
    { label: '질문', href: `/${username}/questions`, icon: MessagesSquareIcon },
    { label: '스타', href: `/${username}/stars`, icon: StarIcon },
  ] satisfies UserDetailNavLinkProps[];

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {links.map((link) => (
        <UserDetailNavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

interface UserDetailNavLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

function UserDetailNavLink({ label, href, icon: Icon }: Readonly<UserDetailNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink href={href} variant={pathname === href ? 'secondary' : 'ghost'}>
      <Icon /> <span className="lg:block">{label}</span>
    </ButtonLink>
  );
}
