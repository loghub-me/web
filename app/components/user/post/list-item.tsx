import { QuestionStatusDot } from '~/components/question';
import { ButtonLink } from '~/components/ui/button';
import { UserAvatar } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';

interface UserPostItemProps {
  post: UserPost;
}

export default function UserPostItem({ post }: Readonly<UserPostItemProps>) {
  const { session } = useAuth();
  const { path, title, questionStatus } = post;

  return (
    session && (
      <ButtonLink to={path} className="px-2 has-[>svg]:px-2 w-full h-fit justify-start">
        <UserAvatar {...session} />
        <span className="truncate">{title}</span>
        {questionStatus && <QuestionStatusDot status={questionStatus} />}
      </ButtonLink>
    )
  );
}
