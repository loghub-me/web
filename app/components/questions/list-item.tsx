import { DotIcon, MessagesSquareIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router';
import Timestamp from '~/components/common/timestamp';
import { QuestionStatusBadge } from '~/components/questions';
import { TopicBadge } from '~/components/topics';
import { Badge } from '~/components/ui/badge';
import { UserInline } from '~/components/users';

interface QuestionListItemProps {
  question: Question;
}

export default function QuestionListItem({ question }: Readonly<QuestionListItemProps>) {
  const { status, stats, slug, title, topics, writerUsername } = question;
  const to = `/questions/@${writerUsername}/${slug}`;

  return (
    <Link to={to} className="flex flex-col gap-4 p-4 rounded-lg transition-colors border bg-card hover:bg-accent">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <h3 className="font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1">
          <QuestionStatusBadge status={status} />
          {stats.starCount > 0 && (
            <Badge variant={'outline'} className="border-transparent">
              <StarIcon /> {stats.starCount}
            </Badge>
          )}
          {stats.answerCount > 0 && (
            <Badge variant={'outline'} className="border-transparent">
              <MessagesSquareIcon /> {stats.answerCount}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        {topics.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {topics.map((topic) => (
              <TopicBadge key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <div className="flex items-center self-end">
          <UserInline username={writerUsername} />
          <DotIcon className="size-4 text-muted-foreground" />
          <Timestamp {...question} />
        </div>
      </div>
    </Link>
  );
}
