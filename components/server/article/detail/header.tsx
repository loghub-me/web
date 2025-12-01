import { ArticleActionMenu, ArticleStarToggle } from '@/components/client/article';
import { UserLink } from '@/components/client/user';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface ArticleDetailHeaderProps {
  article: Pick<ArticleDetail, 'id' | 'slug' | 'writer' | 'stats'>;
}

export default function ArticleDetailHeader({ article }: Readonly<ArticleDetailHeaderProps>) {
  const { writer, stats } = article;

  return (
    <CardHeader className="sticky top-0 z-10 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <ArticleActionMenu article={article} />
      <ArticleStarToggle articleId={article.id} starCount={stats.starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
