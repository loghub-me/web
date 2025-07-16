import { ButtonNavLink } from '~/components/ui/button';

interface SeriesChapterListItemProps {
  chapter: SeriesChapter;
  slug: string;
  writer: User;
  currentSequence?: number;
}

export default function SeriesChapterListItem({
  chapter,
  slug,
  writer,
  currentSequence,
}: Readonly<SeriesChapterListItemProps>) {
  const { sequence, title } = chapter;
  const to = `/@${writer.username}/series/${slug}/${sequence}`;

  return (
    <ButtonNavLink to={to} className="w-full h-fit flex-col items-start gap-1" end>
      <span className="font-semibold text-sm text-primary">챕터 {sequence}</span>
      <p className="font-medium">{title}</p>
    </ButtonNavLink>
  );
}
