import { PencilIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface ArticleEditLinkProps {
  username: string;
  slug: string;
}

export default function ArticleEditLink({ username, slug }: Readonly<ArticleEditLinkProps>) {
  return (
    <ButtonLink to={`/@${username}/articles/${slug}/edit`} variant={'outline'} className="rounded-l-full border-r-0">
      <PencilIcon className="ml-0.5" />
    </ButtonLink>
  );
}
