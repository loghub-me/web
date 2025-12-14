import { UserLink } from '@/components/client/user';
import Timestamp from '@ui/timestamp';
import { DotIcon } from 'lucide-react';

interface ArticleDetailHeroProps {
  article: Pick<ArticleDetail, 'title' | 'writer' | 'publishedAt' | 'updatedAt'>;
}

export default function ArticleDetailHero({ article }: Readonly<ArticleDetailHeroProps>) {
  const { title, writer } = article;

  return (
    <div className="px-4 py-16 space-y-4">
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center justify-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground mr-1" />
        <Timestamp {...article} className="text-sm" />
      </div>
    </div>
  );
}
