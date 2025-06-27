import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '~/components/ui/button';

interface SettingHeaderNavLinkProps {
  name?: string;
  to: string;
  icon: LucideIcon;
}

export default function SettingHeaderNavLink({ name, to, icon: Icon }: Readonly<SettingHeaderNavLinkProps>) {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <Button variant={isActive ? 'secondary' : 'ghost'}>
          <Icon /> {name}
        </Button>
      )}
    </NavLink>
  );
}
