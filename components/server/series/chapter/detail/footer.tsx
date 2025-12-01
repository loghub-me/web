import { ButtonLink } from '@ui/button';
import { CardFooter } from '@ui/card';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SeriesChapterDetailHeaderProps {
  series: Pick<SeriesDetail, 'slug' | 'writer'>;
  chapterSequence: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function SeriesChapterDetailHeader(props: Readonly<SeriesChapterDetailHeaderProps>) {
  const { series, chapterSequence, hasPrev, hasNext } = props;
  const prefixPath = `/series/${series.writer.username}/${series.slug}`;

  return (
    <CardFooter className="flex items-center justify-between gap-2">
      <ButtonLink href={`${prefixPath}/${chapterSequence - 1}`} variant={'outline'} disabled={!hasPrev}>
        <ChevronLeftIcon /> 이전 챕터
      </ButtonLink>
      <span className="text-muted-foreground font-semibold">{chapterSequence}</span>
      <ButtonLink href={`${prefixPath}/${chapterSequence + 1}`} variant={'outline'} disabled={!hasNext}>
        다음 챕터 <ChevronRightIcon />
      </ButtonLink>
    </CardFooter>
  );
}
