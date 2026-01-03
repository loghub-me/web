import { TopicLink } from '@/components/client/topic';
import { Card, CardContent } from '@ui/card';
import { Thumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';

interface ArticleMetaCardProps {
  article: Pick<ArticleDetail, 'title' | 'thumbnail' | 'topics' | 'publishedAt' | 'updatedAt'>;
}

export default function ArticleMetaCard({ article }: Readonly<ArticleMetaCardProps>) {
  return (
    <Card className="py-4">
      <CardContent className="flex flex-row md:flex-col gap-4">
        <Thumbnail
          aspect={'16:9'}
          src={article.thumbnail}
          alt={`${article.title}-thumbnail`}
          width={320}
          height={426}
          className="w-40 sm:w-auto"
        />
        <div className="flex-1 space-y-1.5">
          <h3 className="font-semibold">{article.title}</h3>
          {article.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.topics.map((topic) => (
                <TopicLink key={topic.slug} topic={topic} />
              ))}
            </div>
          )}
        </div>
        <p className="text-right">
          <Timestamp {...article} />
        </p>
      </CardContent>
    </Card>
  );
}
