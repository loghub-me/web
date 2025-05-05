import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import { cn } from '~/lib/utils';

interface HeaderNavLinkProps {
  name: string;
  to: string;
}

export default function HeaderNavLink({ name, to }: Readonly<HeaderNavLinkProps>) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        cn('relative flex items-center justify-center h-9', isActive && 'text-primary', isPending && 'animate-pulse')
      }
    >
      {({ isActive }) => (
        <>
          <span>{name}</span>
          {isActive && (
            <motion.hr layoutId="underbar" className="absolute bottom-0 w-2/3 rounded-full border-2 border-primary" />
          )}
        </>
      )}
    </NavLink>
  );
}
