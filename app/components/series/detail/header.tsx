import { SeriesEditLink, SeriesRemoveButton, SeriesStarButton } from '~/components/series';
import { useAuth } from '~/hooks/use-auth';

interface SeriesChapterDetailHeaderProps {
  id: number;
  slug: string;
  writer: User;
  stats: SeriesStats;
}

export default function SeriesChapterDetailHeader({
  id,
  slug,
  writer: { username },
  stats: { starCount },
}: Readonly<SeriesChapterDetailHeaderProps>) {
  const { session } = useAuth();

  return (
    <div className="px-4 w-full h-16 flex items-center justify-end gap-2 border-b">
      {session?.username === username && (
        <div>
          <SeriesEditLink username={username} slug={slug} />
          <SeriesRemoveButton id={id} />
        </div>
      )}
      <SeriesStarButton seriesId={id} starCount={starCount} />
    </div>
  );
}
