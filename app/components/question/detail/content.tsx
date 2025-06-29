import { TopicBadge } from '~/components/topic';
import { CardContent } from '~/components/ui/card';

interface QuestionDetailContentProps {
  topics: Topic[];
  title: string;
  content: { html: string };
}

export default function QuestionDetailContent({ topics, title, content }: Readonly<QuestionDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} linkify={true} />
          ))}
        </div>
      )}
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
