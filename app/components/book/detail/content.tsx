import Timestamp from '~/components/common/timestamp';
import { TopicBadge } from '~/components/topic';
import { UserInline } from '~/components/user';

interface BookDetailContentProps {
  id: number;
  title: string;
  thumbnail: string;
  topics: Topic[];
  writer: User;
  content: string;
  stats: BookStats;
  createdAt: string;
  updatedAt: string;
}

export default function BookDetailContent({
  title,
  thumbnail,
  topics,
  writer,
  content,
  createdAt,
  updatedAt,
}: Readonly<BookDetailContentProps>) {
  return (
    <div className="px-4 space-y-2">
      <img
        className="w-full aspect-book rounded-xl border"
        src={`${import.meta.env.VITE_BUCKET_HOST}/${thumbnail}`}
        alt={title}
      />
      <div className="space-y-2">
        <h2 className="font-semibold">{title}</h2>
        {topics.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {topics.map((topic) => (
              <TopicBadge key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <UserInline username={writer.username} />
      </div>
      <p className="p-2 border-y text-sm text-muted-foreground">{content}</p>
      <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  );
}
