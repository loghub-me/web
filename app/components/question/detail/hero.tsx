import { DotIcon } from 'lucide-react';
import Timestamp from '~/components/common/timestamp';
import { QuestionStatusBadge } from '~/components/question';
import { UserLink } from '~/components/user';

interface QuestionDetailHeroProps {
  title: string;
  status: QuestionStatus;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

export default function QuestionDetailHero({
  title,
  status,
  writer,
  createdAt,
  updatedAt,
}: Readonly<QuestionDetailHeroProps>) {
  return (
    <div className="p-16 space-y-4">
      <div className="flex justify-center">
        <QuestionStatusBadge status={status} />
      </div>
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center justify-center">
        <UserLink username={writer.username} />
        <DotIcon className="text-muted-foreground mr-2" />
        <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
      </div>
    </div>
  );
}
