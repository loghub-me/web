import Timestamp from '~/components/common/timestamp';
import { CardFooter } from '~/components/ui/card';

interface QuestionDetailFooterProps {
  createdAt: string;
  updatedAt: string;
}

export default function QuestionDetailFooter({ createdAt, updatedAt }: Readonly<QuestionDetailFooterProps>) {
  return (
    <CardFooter>
      <hr className="mb-4" />
      <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
    </CardFooter>
  );
}
