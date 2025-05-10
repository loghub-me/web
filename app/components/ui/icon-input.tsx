import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { Input } from '~/components/ui/input';

function IconInput(props: React.ComponentProps<'input'> & { icon: LucideIcon }) {
  const Icon = props.icon;

  return (
    <div className="relative w-full">
      <Icon className="absolute top-2.75 left-3.25 size-3.5 text-muted-foreground" />
      <Input className="absolute pl-9.5" {...props} />
    </div>
  );
}

export { IconInput };
