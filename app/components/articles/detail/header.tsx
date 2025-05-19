import { Link } from 'react-router';
import { ArticleEditLink, ArticleRemoveButton, ArticleStarButton } from '~/components/articles';
import { Button } from '~/components/ui/button';
import ScrollProgressBar from '~/components/ui/scroll-progress-bar';
import { UserInline } from '~/components/users';
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
    <div className="sticky top-0 z-40 px-4 w-full h-16 bg-card/70 backdrop-blur flex items-center justify-end gap-2 rounded-t-xl border-b">
      <Button variant={'ghost'} className="mr-auto px-2" asChild>
        <Link to={`/@${username}`}>
          <UserInline username={username} />
        </Link>
      </Button>
      {session?.username === username && (
        <div className="overflow-hidden">
          <ArticleEditLink username={username} slug={slug} />
          <ArticleRemoveButton id={id} />
        </div>
      )}
      <ArticleStarButton articleId={id} starCount={starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </div>
  );
}
