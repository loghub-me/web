import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRightIcon, ListIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

interface SeriesChapterEditListItemProps {
  slug: string;
  writer: User;
  chapter: SeriesChapter;
}

export default function SeriesChapterEditListItem({ slug, writer, chapter }: Readonly<SeriesChapterEditListItemProps>) {
  const { sequence, title } = chapter;
  const to = `/@${writer.username}/series/${slug}/${sequence}/edit`;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sequence });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4 flex-row items-center rounded-md">
      <CardHeader className="px-0">
        <ListIcon className="size-4 cursor-pointer" size={20} data-drag-handle {...attributes} {...listeners} />
      </CardHeader>
      <CardContent className="px-0 flex-1">
        <CardDescription className="text-xs font-semibold text-primary">챕터 {sequence}</CardDescription>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardContent>
      <CardFooter className="px-0">
        <ButtonLink to={to} size={'icon'}>
          <ChevronRightIcon />
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
