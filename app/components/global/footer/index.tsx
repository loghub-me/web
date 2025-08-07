import { Link, useLocation } from 'react-router';
import Logo from '~/components/global/logo';
import { Separator } from '~/components/ui/separator';
import { CONTACT_LINKS, LEGAL_LINKS, MANUAL_LINKS, SEARCH_LINKS } from '~/constants/nav-links';

const footerNavSections = [
  { name: 'Manual', links: MANUAL_LINKS },
  { name: 'Search', links: SEARCH_LINKS },
  { name: 'Legal', links: LEGAL_LINKS },
  { name: 'Contact', links: CONTACT_LINKS },
];

export default function GlobalFooter() {
  const { pathname } = useLocation();
  const isPostEditPage = pathname.startsWith('/post/') || pathname.endsWith('/edit');

  return (
    !isPostEditPage && (
      <footer className="relative z-10 w-full py-8 space-y-8 border-t bg-card text-card-foreground">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link to={'/'}>
              <Logo />
            </Link>
            <p className="text-center text-muted-foreground lg:text-left">
              LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
            {footerNavSections.map((section) => (
              <nav className="space-y-3 text-center lg:text-left" key={section.name} role="navigation">
                <h4 className="font-semibold text-primary">{section.name}</h4>
                <ul className="space-y-1">
                  {section.links.map(({ to, name }) => (
                    <li key={to}>
                      <Link to={to} className="text-sm hover:underline">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <Separator className="mx-auto max-w-72" />
        <p className="text-center">&copy; 2025. All rights reserved.</p>
      </footer>
    )
  );
}
