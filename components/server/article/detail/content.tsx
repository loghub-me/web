import { TopicLink } from '@/components/client/topic';
import { CardContent } from '@ui/card';
import { Thumbnail } from '@ui/thumbnail';

interface ArticleDetailContentProps {
  article: Pick<ArticleDetail, 'title' | 'content' | 'thumbnail' | 'topics'>;
}

export default function ArticleDetailContent({ article }: Readonly<ArticleDetailContentProps>) {
  const { title, content, thumbnail, topics } = article;

  return (
    <CardContent className="space-y-4">
      <div className="space-y-4">
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topics.map((topic) => (
              <TopicLink key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <figure>
          <Thumbnail aspect={'16:9'} src={thumbnail} alt={`${title}-thumbnail`} fill className="mx-auto max-w-2xl" />
          <figcaption className="mt-2 text-sm text-center text-muted-foreground">{title}</figcaption>
        </figure>
      </div>
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
