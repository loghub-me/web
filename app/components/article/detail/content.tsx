import ThumbnailImage from '~/components/common/thumbnail/image';
import { TopicBadge } from '~/components/topic';
import { CardContent } from '~/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

interface ArticleDetailContentProps {
  topics: Topic[];
  title: string;
  content: { html: string };
  thumbnail: string;
}

export default function ArticleDetailContent({
  topics,
  title,
  thumbnail,
  content,
}: Readonly<ArticleDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} linkify={true} />
          ))}
        </div>
      )}
      <Dialog>
        <DialogTrigger className="group cursor-pointer">
          <ThumbnailImage src={thumbnail} alt={title} type={'article'} />
        </DialogTrigger>
        <DialogContent className="p-0 border-0">
          <DialogHeader className="hidden">
            <DialogTitle>썸네일</DialogTitle>
          </DialogHeader>
          <ThumbnailImage src={thumbnail} alt={title} type={'article'} className={'aspect-auto border-none'} />
        </DialogContent>
      </Dialog>
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
