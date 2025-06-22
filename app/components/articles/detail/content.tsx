import { TopicBadge } from '~/components/topics';
import { CardContent } from '~/components/ui/card';

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
      <img src={`${import.meta.env.VITE_BUCKET_HOST}/${thumbnail}`} alt={title} className="w-full border rounded-md" />
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
