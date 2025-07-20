import { ButtonNavLink } from '~/components/ui/button';

interface SeriesChapterEditListItemProps {
  slug: string;
  writer: User;
  chapter: SeriesChapter;
}

export default function SeriesChapterEditListItem({ slug, writer, chapter }: Readonly<SeriesChapterEditListItemProps>) {
  const { sequence, title } = chapter;
  const to = `/@${writer.username}/series/${slug}/${sequence}/edit`;

  return (
    <ButtonNavLink to={to} size={'custom'} className="px-3 py-2 w-full flex-col items-start gap-1 border" end>
      <span className="font-semibold text-sm text-primary">챕터 {sequence}</span>
      <p className="font-medium">{title}</p>
    </ButtonNavLink>
  );
}
