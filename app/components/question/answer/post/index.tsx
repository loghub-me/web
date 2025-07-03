import { QuestionAnswerPostClosed, QuestionAnswerPostForm, QuestionAnswerPostLink } from '~/components/question';
import { useAuth } from '~/hooks/use-auth';

interface AnswerPostProps {
  questionId: number;
  questionStatus: QuestionStatus;
}

export default function AnswerPost({ questionId, questionStatus }: Readonly<AnswerPostProps>) {
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
