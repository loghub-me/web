import { QuestionCloseButton, QuestionEditLink, QuestionRemoveButton, QuestionStarButton } from '~/components/question';
import { CardHeader } from '~/components/ui/card';
import ScrollProgressBar from '~/components/ui/scroll-progress-bar';
import { UserLink } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';

interface QuestionDetailHeaderProps {
  id: number;
  slug: string;
  writer: User;
  stats: { starCount: number };
  status: QuestionStatus;
}

export default function QuestionDetailHeader({
  id,
  slug,
  writer: { username },
  stats: { starCount },
  status,
}: Readonly<QuestionDetailHeaderProps>) {
  const { session } = useAuth();
  const isOpen = status === 'OPEN';

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink username={username} className="mr-auto" />
      {session?.username === username && isOpen && (
        <div>
          <QuestionEditLink username={username} slug={slug} />
          <QuestionCloseButton id={id} />
        </div>
      )}
      {session?.username === username && <QuestionRemoveButton id={id} />}
      <QuestionStarButton questionId={id} starCount={starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
