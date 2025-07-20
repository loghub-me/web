import ThumbnailImage from '~/components/common/thumbnail/image';
import Timestamp from '~/components/common/timestamp';
import { TopicBadge } from '~/components/topic';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { UserInline } from '~/components/user';

interface SeriesDetailContentProps {
  id: number;
  title: string;
  thumbnail: string;
  topics: Topic[];
  writer: User;
  content: string;
  stats: SeriesStats;
  createdAt: string;
  updatedAt: string;
}

export default function SeriesDetailContent({
  title,
  thumbnail,
  topics,
  writer,
  content,
  createdAt,
  updatedAt,
}: Readonly<SeriesDetailContentProps>) {
  return (
    <div className="px-4 space-y-2">
      <Dialog>
        <DialogTrigger className="group cursor-pointer">
          <ThumbnailImage src={thumbnail} alt={title} type={'series'} />
        </DialogTrigger>
        <DialogContent className="p-0 border-0">
          <DialogHeader className="hidden">
            <DialogTitle>썸네일</DialogTitle>
          </DialogHeader>
          <ThumbnailImage src={thumbnail} alt={title} type={'series'} className={'aspect-auto border-none'} />
        </DialogContent>
      </Dialog>
      <div className="space-y-2">
        <h2 className="font-semibold">{title}</h2>
        {topics.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {topics.map((topic) => (
              <TopicBadge key={topic.slug} topic={topic} linkify={true} />
            ))}
          </div>
        )}
        <UserInline id={writer.id} username={writer.username} />
      </div>
      <p className="p-2 border-y text-sm">{content}</p>
      <Timestamp createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  );
}
