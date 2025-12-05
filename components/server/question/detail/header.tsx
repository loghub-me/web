import { QuestionActionMenu, QuestionAnswerGenerateButton, QuestionStarToggle } from '@/components/client/question';
import { UserLink } from '@/components/client/user';
import { QuestionShareMenu } from '@/components/server/question';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface QuestionDetailHeaderProps {
  question: Pick<QuestionDetail, 'id' | 'slug' | 'title' | 'status' | 'stats' | 'writer'>;
}

export default function QuestionDetailHeader({ question }: Readonly<QuestionDetailHeaderProps>) {
  const { stats, writer } = question;

  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <QuestionActionMenu question={question} />
      <QuestionAnswerGenerateButton question={question} align={'end'} />
      <QuestionShareMenu question={question} />
      <QuestionStarToggle questionId={question.id} starCount={stats.starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
