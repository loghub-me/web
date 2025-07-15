import { TerminalIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

export default function HomeHelpButton() {
  return (
    <ButtonLink to={'/manual'} variant={'outline'} className="rounded-full hover:px-6">
      <TerminalIcon /> $ man loghub-kr
    </ButtonLink>
  );
}
