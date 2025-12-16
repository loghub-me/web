import { ButtonLink } from '@ui/button-link';
import { CardFooter } from '@ui/card';
import Timestamp from '@ui/timestamp';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SeriesChapterDetailFooterProps {
  series: Pick<SeriesDetail, 'slug' | 'writer'>;
  chapter: Pick<SeriesChapterDetail, 'sequence' | 'publishedAt' | 'updatedAt'>;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function SeriesChapterDetailFooter(props: Readonly<SeriesChapterDetailFooterProps>) {
  const { series, chapter, hasPrev, hasNext } = props;
  const prefixPath = `/series/${series.writer.username}/${series.slug}`;

  return (
    <CardFooter className="space-y-2">
      <p className="text-right">
        <Timestamp {...chapter} />
      </p>
      <div className="flex items-center justify-between gap-2">
        <ButtonLink href={`${prefixPath}/${chapter.sequence - 1}`} variant={'outline'} disabled={!hasPrev}>
          <ChevronLeftIcon /> 이전 챕터
        </ButtonLink>
        <span className="text-muted-foreground font-semibold">{chapter.sequence}</span>
        <ButtonLink href={`${prefixPath}/${chapter.sequence + 1}`} variant={'outline'} disabled={!hasNext}>
          다음 챕터 <ChevronRightIcon />
        </ButtonLink>
      </div>
    </CardFooter>
  );
}
