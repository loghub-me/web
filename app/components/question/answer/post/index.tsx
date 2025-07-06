import { QuestionAnswerPostClosed, QuestionAnswerPostForm, QuestionAnswerPostLink } from '~/components/question';
import { useAuth } from '~/hooks/use-auth';

interface QuestionAnswerPostProps {
  questionId: number;
  questionStatus: QuestionStatus;
}

export default function QuestionAnswerPost({ questionId, questionStatus }: Readonly<QuestionAnswerPostProps>) {
  const { status } = useAuth();

  switch (questionStatus) {
    case 'OPEN':
      return status === 'authenticated' ? (
        <QuestionAnswerPostForm questionId={questionId} />
      ) : (
        <QuestionAnswerPostLink />
      );
    default:
      return <QuestionAnswerPostClosed />;
  }
}
