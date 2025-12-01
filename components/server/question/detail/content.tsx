import { TopicLink } from '@/components/client/topic';
import { CardContent } from '@ui/card';

interface QuestionDetailContentProps {
  question: Pick<QuestionDetail, 'content' | 'topics'>;
}

export default function QuestionDetailContent({ question }: Readonly<QuestionDetailContentProps>) {
  const { content, topics } = question;

  return (
    <CardContent className="space-y-4">
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {topics.map((topic) => (
            <TopicLink key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
