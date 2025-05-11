import { TopicBadge } from '~/components/topics';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface ArticleDetailContentProps {
  topics: Topic[];
  html: string;
}

export default function ArticleDetailContent({ topics, html }: Readonly<ArticleDetailContentProps>) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-1 flex-wrap">
        {topics.map((topic) => (
          <TopicBadge key={topic.slug} topic={topic} />
        ))}
      </CardHeader>
      <CardContent className="markdown-it" dangerouslySetInnerHTML={{ __html: html }} />
    </Card>
  );
}
