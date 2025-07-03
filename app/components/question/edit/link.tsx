import { PencilIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface QuestionEditLinkProps {
  username: string;
  slug: string;
}

export default function QuestionEditLink({ username, slug }: Readonly<QuestionEditLinkProps>) {
  return (
    <ButtonLink to={`/@${username}/questions/${slug}/edit`} variant={'outline'} className="rounded-l-full border-r-0">
      <PencilIcon className="ml-0.5" />
    </ButtonLink>
  );
}
