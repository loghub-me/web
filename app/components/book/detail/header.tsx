import { BookEditLink, BookRemoveButton, BookStarButton } from '~/components/book';
import { CardHeader } from '~/components/ui/card';
import { useAuth } from '~/hooks/use-auth';

interface BookChapterDetailHeaderProps {
  id: number;
  slug: string;
  writer: User;
  stats: BookStats;
}

export default function BookChapterDetailHeader({
  id,
  slug,
  writer: { username },
  stats: { starCount },
}: Readonly<BookChapterDetailHeaderProps>) {
  const { session } = useAuth();

  return (
    <CardHeader className="sticky top-0 z-40 px-4 w-full h-16 bg-card/70 backdrop-blur flex items-center justify-between gap-2 rounded-t-xl border-b">
      {session?.username === username && (
        <div>
          <BookEditLink username={username} slug={slug} />
          <BookRemoveButton id={id} />
        </div>
      )}
      <BookStarButton bookId={id} starCount={starCount} />
    </CardHeader>
  );
}
