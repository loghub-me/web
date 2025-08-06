import { ArrowUpDownIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { changeSeriesChapterSequence } from '~/apis/client/series';
import { Button, ButtonLink } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { handleMessageError } from '~/lib/error';

interface SeriesChapterEditListItemProps {
  id: number;
  slug: string;
  writer: User;
  chapter: SeriesChapter;
  isFirst: boolean;
  isLast: boolean;
}

export default function SeriesChapterEditListItem({
  id: seriesId,
  slug: seriesSlug,
  writer: seriesWriter,
  chapter,
  isFirst,
  isLast,
}: Readonly<SeriesChapterEditListItemProps>) {
  const { sequence, title } = chapter;
  const to = `/@${seriesWriter.username}/series/${seriesSlug}/${sequence}/edit`;
  const navigate = useNavigate();

  function onClickSequenceChange(direction: 'up' | 'down') {
    changeSeriesChapterSequence(seriesId, sequence, direction === 'up' ? sequence - 1 : sequence + 1)
      .then(({ message }) => {
        toast.success(message, { icon: <ArrowUpDownIcon className="size-4" /> });
        navigate(`/@${seriesWriter.username}/series/${seriesSlug}/edit`);
      })
      .catch(handleMessageError);
  }

  return (
    <Card className="p-4 flex-row items-center rounded-md">
      <CardHeader className="px-0 flex flex-col">
        <Button
          type={'button'}
          variant={'ghost'}
          size={'custom'}
          className="p-1"
          disabled={isFirst}
          onClick={() => onClickSequenceChange('up')}
        >
          <ChevronUpIcon />
        </Button>
        <Button
          type={'button'}
          variant={'ghost'}
          size={'custom'}
          className="p-1"
          disabled={isLast}
          onClick={() => onClickSequenceChange('down')}
        >
          <ChevronDownIcon />
        </Button>
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
