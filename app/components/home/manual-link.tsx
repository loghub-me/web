import { TerminalIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

export default function HomeManualLink() {
  return (
    <ButtonLink to={'/manual'} variant={'outline'} size={'custom'} className="rounded-full p-1.5 pr-3">
      <span className={'p-1 text-accent-foreground bg-accent border rounded-full'}>
        <TerminalIcon className="size-3 stroke-2.5" />
      </span>
      <span>$ man loghub-kr</span>
    </ButtonLink>
  );
}
