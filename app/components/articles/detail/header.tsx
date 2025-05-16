import { StarIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import ScrollProgressBar from '~/components/ui/scroll-progress-bar';
import { UserInline } from '~/components/users';

interface ArticleDetailHeaderProps {
  title: string;
  writer: User;
  stats: { starCount: number };
}

export default function ArticleDetailHeader({
  title,
  writer: { username },
  stats: { starCount },
}: Readonly<ArticleDetailHeaderProps>) {
  return (
    <div className="sticky top-0 z-40 px-4 w-full h-16 bg-card/70 backdrop-blur flex items-center gap-2 rounded-t-xl border-b">
      <Button variant={'ghost'} className="px-2" asChild>
        <Link to={`/@${username}`}>
          <UserInline username={username} />
        </Link>
      </Button>
      <Button className="ml-auto rounded-full" variant={'outline'}>
        <StarIcon /> {starCount}
      </Button>
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </div>
  );
}
