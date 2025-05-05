import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '~/components/ui/button';

interface SidebarNavLinkProps {
  name: string;
  to: string;
  icon: LucideIcon;
  closeSheet: () => void;
}

export default function SidebarNavLink({ name, to, icon: Icon, closeSheet }: Readonly<SidebarNavLinkProps>) {
  return (
    <NavLink to={to} onClick={closeSheet}>
      {({ isActive }) => (
        <Button variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
          <Icon className="size-3" />
          <span>{name}</span>
        </Button>
      )}
    </NavLink>
  );
}
