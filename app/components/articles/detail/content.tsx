import { TopicBadge } from '~/components/topics';
import { CardContent } from '~/components/ui/card';

interface ArticleDetailContentProps {
  topics: Topic[];
  html: string;
}

export default function ArticleDetailContent({ topics, html }: Readonly<ArticleDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      <div className="flex gap-1 flex-wrap">
        {topics.map((topic) => (
          <TopicBadge key={topic.slug} topic={topic} />
        ))}
      </div>
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: html }} />
    </CardContent>
  );
}
