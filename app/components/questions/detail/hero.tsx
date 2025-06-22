import { DotIcon } from 'lucide-react';
import { QuestionStatusBadge } from '~/components/questions';
import { UserInline } from '~/components/users';
import { parseRelativeTime } from '~/lib/parse';

interface QuestionDetailHeroProps {
  title: string;
  status: QuestionStatus;
  writer: User;
  createdAt: string;
}

export default function QuestionDetailHero({ title, status, writer, createdAt }: Readonly<QuestionDetailHeroProps>) {
  return (
    <div className="p-16 space-y-4">
      <div className="flex justify-center">
        <QuestionStatusBadge status={status} />
      </div>
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center gap-1 justify-center">
        <UserInline username={writer.username} />
        <DotIcon className="text-muted-foreground" />
        <span className="text-center text-muted-foreground text-sm">{parseRelativeTime(createdAt)}</span>
      </div>
    </div>
  );
}
