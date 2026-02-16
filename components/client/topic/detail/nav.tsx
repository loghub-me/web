'use client';

import { ButtonLink } from '@ui/button-link';
import { LayersIcon, LucideIcon, MessagesSquareIcon, NotepadTextIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface TopicDetailNavProps {
  slug: string;
}

export default function TopicDetailNav({ slug }: Readonly<TopicDetailNavProps>) {
  const links = [
    { label: '아티클', href: `/topics/${slug}/articles`, icon: NotepadTextIcon },
    { label: '시리즈', href: `/topics/${slug}/series`, icon: LayersIcon },
    { label: '질문', href: `/topics/${slug}/questions`, icon: MessagesSquareIcon },
  ] satisfies TopicDetailNavLinkProps[];

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => (
        <TopicDetailNavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

interface TopicDetailNavLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

function TopicDetailNavLink({ label, href, icon: Icon }: Readonly<TopicDetailNavLinkProps>) {
  const pathname = usePathname();

  return (
    <ButtonLink href={href} variant={pathname === href ? 'secondary' : 'ghost'}>
      <Icon /> <span className="lg:block">{label}</span>
    </ButtonLink>
  );
}
