import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

interface QuestionEditLinkProps {
  username: string;
  slug: string;
}

export default function QuestionEditLink({ username, slug }: Readonly<QuestionEditLinkProps>) {
  return (
    <Button
      className="rounded-none first:rounded-l-full last:rounded-r-full not-first:border-l-0"
      variant="outline"
      asChild
    >
      <Link to={`/questions/@${username}/${slug}/edit`}>
        <PencilIcon className="ml-0.5" />
      </Link>
    </Button>
  );
}
