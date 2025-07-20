import { ButtonNavLink } from '~/components/ui/button';

interface SeriesChapterListItemProps {
  slug: string;
  writer: User;
  chapter: SeriesChapter;
}

export default function SeriesChapterListItem({ slug, writer, chapter }: Readonly<SeriesChapterListItemProps>) {
  const { sequence, title } = chapter;
  const to = `/@${writer.username}/series/${slug}/${sequence}`;

  return (
    <ButtonNavLink to={to} size={'custom'} className="px-3 py-2 w-full flex-col items-start gap-1" end>
      <span className="font-semibold text-sm text-primary">챕터 {sequence}</span>
      <p className="font-medium">{title}</p>
    </ButtonNavLink>
  );
}
