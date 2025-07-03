import { PencilIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface BookEditLinkProps {
  username: string;
  slug: string;
}

export default function BookEditLink({ username, slug }: Readonly<BookEditLinkProps>) {
  return (
    <ButtonLink to={`/@${username}/books/${slug}/edit`} variant={'outline'} className="rounded-l-full border-r-0">
      <PencilIcon className="ml-0.5" />
    </ButtonLink>
  );
}
