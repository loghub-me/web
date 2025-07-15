import { BookEditLink, BookRemoveButton, BookStarButton } from '~/components/book';
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
    <div className="px-4 w-full h-16 flex items-center justify-end gap-2 border-b">
      {session?.username === username && (
        <div>
          <BookEditLink username={username} slug={slug} />
          <BookRemoveButton id={id} />
        </div>
      )}
      <BookStarButton bookId={id} starCount={starCount} />
    </div>
  );
}
