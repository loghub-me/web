import { PencilIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface SeriesEditLinkProps {
  username: string;
  slug: string;
}

export default function SeriesEditLink({ username, slug }: Readonly<SeriesEditLinkProps>) {
  return (
    <ButtonLink to={`/@${username}/series/${slug}/edit`} variant={'outline'} className="rounded-l-full border-r-0">
      <PencilIcon className="ml-0.5" />
    </ButtonLink>
  );
}
