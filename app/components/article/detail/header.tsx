import { ArticleEditLink, ArticleRemoveButton, ArticleStarButton } from '~/components/article';
import { CardHeader } from '~/components/ui/card';
import ScrollProgressBar from '~/components/ui/scroll-progress-bar';
import { UserLink } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';

interface ArticleDetailHeaderProps {
  id: number;
  slug: string;
  writer: User;
  stats: { starCount: number };
}

export default function ArticleDetailHeader({
  id,
  slug,
  writer: { username },
  stats: { starCount },
}: Readonly<ArticleDetailHeaderProps>) {
  const { session } = useAuth();

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink username={username} className={'mr-auto'} />
      {session?.username === username && (
        <div>
          <ArticleEditLink username={username} slug={slug} />
          <ArticleRemoveButton id={id} />
        </div>
      )}
      <ArticleStarButton articleId={id} starCount={starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
