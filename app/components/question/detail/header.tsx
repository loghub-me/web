import {
  QuestionAnswerGenerateRequestButton,
  QuestionCloseButton,
  QuestionEditLink,
  QuestionRemoveButton,
  QuestionStarButton,
} from '~/components/question';
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

export default function QuestionDetailHeader({ id, slug, writer, stats, status }: Readonly<QuestionDetailHeaderProps>) {
  const { session } = useAuth();
  const isOpen = status === 'OPEN';

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className="mr-auto" />
      {session?.username === writer.username && (
        <div className="rounded-full border overflow-hidden">
          {isOpen && <QuestionEditLink username={writer.username} slug={slug} />}
          <QuestionRemoveButton id={id} />
        </div>
      )}
      {session?.username === writer.username && isOpen && (
        <div className="rounded-full border overflow-hidden">
          <QuestionAnswerGenerateRequestButton id={id} />
          <QuestionCloseButton id={id} />
        </div>
      )}
      <QuestionStarButton questionId={id} starCount={stats.starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
