import { Link, useLocation } from 'react-router';
import Logo from '~/components/global/logo';
import { Separator } from '~/components/ui/separator';

export const navLinks = [
  {
    name: 'About',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Our Team', to: '/team' },
      { name: 'Careers', to: '/careers' },
    ],
  },
  {
    name: 'Services',
    links: [
      { name: 'Articles', to: '/manual/articles' },
      { name: 'Books', to: '/manual/books' },
      { name: 'Questions', to: '/manual/questions' },
    ],
  },
  {
    name: 'Legal',
    links: [
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
    ],
  },
  {
    name: 'Contact',
    links: [
      // TODO: Implement links
      { name: 'Contact Us', to: '/contact' },
      { name: 'Discord', to: 'https://discord.gg' },
      { name: 'GitHub', to: 'https://github.com' },
      { name: 'X', to: 'https://x.com' },
    ],
  },
];

export default function GlobalFooter() {
  const { pathname } = useLocation();
  const isPostEditPage = pathname.startsWith('/post/') || pathname.endsWith('/edit');

  return (
    !isPostEditPage && (
      <footer className="w-full py-8 space-y-8 border-t bg-card text-card-foreground">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link to={'/'}>
              <Logo />
            </Link>
            <p className="text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
            {navLinks.map((section) => (
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
        <Separator className="mx-auto max-w-sm" />
        <p className="text-center">&copy; 2025. All rights reserved.</p>
      </footer>
    )
  );
}
