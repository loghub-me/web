import { PencilIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

interface QuestionEditLinkProps {
  username: string;
  slug: string;
}

export default function QuestionEditLink({ username, slug }: Readonly<QuestionEditLinkProps>) {
  return (
    <ButtonLink to={`/@${username}/questions/${slug}/edit`} variant={'outline'} size={'multi'}>
      <PencilIcon />
    </ButtonLink>
  );
}
