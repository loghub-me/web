import Timestamp from '~/components/common/timestamp';
import { CardFooter } from '~/components/ui/card';

interface ArticleDetailFooterProps {
  createdAt: string;
  updatedAt: string;
}

export default function ArticleDetailFooter({ createdAt, updatedAt }: Readonly<ArticleDetailFooterProps>) {
  return (
    <CardFooter>
      <hr className="mb-4" />
      <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
    </CardFooter>
  );
}
