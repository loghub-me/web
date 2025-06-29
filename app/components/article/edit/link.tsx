import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

interface ArticleEditLinkProps {
  username: string;
  slug: string;
}

export default function ArticleEditLink({ username, slug }: Readonly<ArticleEditLinkProps>) {
  return (
    <Button className="rounded-l-full border-r-0" variant="outline" asChild>
      <Link to={`/@${username}/articles/${slug}/edit`}>
        <PencilIcon className="ml-0.5" />
      </Link>
    </Button>
  );
}
