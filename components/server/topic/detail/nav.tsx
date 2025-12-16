import { TOPIC_DETAIL_LINKS } from '@/constants/links';
import { ButtonLink } from '@ui/button-link';
import { LucideIcon } from 'lucide-react';

interface TopicDetailNavProps {
  slug: string;
  view: string;
}

export default function TopicDetailNav({ slug, view }: Readonly<TopicDetailNavProps>) {
  return (
    <nav className="flex items-center gap-1">
      {TOPIC_DETAIL_LINKS.map((link) => (
        <TopicDetailNavLink key={link.view} {...link} current={{ slug, view }} />
      ))}
    </nav>
  );
}

interface TopicDetailNavLinkProps {
  label: string;
  view: string;
  icon: LucideIcon;
  current: {
    slug: string;
    view: string;
  };
}

function TopicDetailNavLink({ label, view, icon: Icon, current }: Readonly<TopicDetailNavLinkProps>) {
  return (
    <ButtonLink
      href={`/topics/${current.slug}/${view}`}
      variant={current.view === view ? 'secondary' : 'ghost'}
      size={'sm'}
    >
      <Icon /> {label}
    </ButtonLink>
  );
}
