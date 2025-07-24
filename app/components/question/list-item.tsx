import { DotIcon, MessagesSquareIcon } from 'lucide-react';
import Timestamp from '~/components/common/timestamp';
import { QuestionStatusBadge } from '~/components/question';
import { TopicBadge } from '~/components/topic';
import { Badge } from '~/components/ui/badge';
import { ButtonLink } from '~/components/ui/button';
import { UserInline } from '~/components/user';

interface QuestionListItemProps {
  question: Question;
}

export default function QuestionListItem({ question }: Readonly<QuestionListItemProps>) {
  const { status, stats, slug, title, topics, writer } = question;
  const to = `/@${writer.username}/questions/${slug}`;

  return (
    <ButtonLink
      to={to}
      size={'custom'}
      className={'w-full p-4 rounded-xl block space-y-2 items-start shadow-none'}
      variant={'outline'}
    >
      <div className="flex gap-1">
        <QuestionStatusBadge status={status} />
        {stats.answerCount > 0 && (
          <Badge variant={'outline'} className="border-transparent">
            <MessagesSquareIcon className="size-2" /> {stats.answerCount}
          </Badge>
        )}
      </div>
      <h3 className="font-medium whitespace-break-spaces line-clamp-2">{title}</h3>
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
        <div className="flex items-center gap-1 self-end">
          <UserInline {...writer} />
          <DotIcon className="text-muted-foreground" />
          <Timestamp {...question} showUpdated={false} />
        </div>
      </div>
    </ButtonLink>
  );
}
