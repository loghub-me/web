import { AnswerPostClosed, AnswerPostForm, AnswerPostLink } from '~/components/questions/answers';
import { useAuth } from '~/hooks/use-auth';

interface AnswerPostProps {
  questionId: number;
  questionStatus: QuestionStatus;
}

export default function AnswerPost({ questionId, questionStatus }: Readonly<AnswerPostProps>) {
  const { status } = useAuth();

  switch (questionStatus) {
    case 'OPEN':
      return status === 'authenticated' ? <AnswerPostForm questionId={questionId} /> : <AnswerPostLink />;
    default:
      return <AnswerPostClosed />;
  }
}
