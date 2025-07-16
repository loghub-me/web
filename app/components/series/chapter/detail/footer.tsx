import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { CardFooter } from '~/components/ui/card';

interface SeriesChapterDetailFooterProps {
  seriesSlug: string;
  writerUsername: string;
  currentSequence: number;
  totalChapters: number;
}

export default function SeriesChapterDetailFooter({
  seriesSlug,
  writerUsername,
  currentSequence,
  totalChapters,
}: Readonly<SeriesChapterDetailFooterProps>) {
  const hasPrev = currentSequence > 1;
  const hasNext = currentSequence < totalChapters;

  return (
    <CardFooter className="flex justify-between">
      <ButtonLink to={`/@${writerUsername}/series/${seriesSlug}/${currentSequence - 1}`} disabled={!hasPrev}>
        <ChevronLeftIcon /> 이전 챕터
      </ButtonLink>
      <ButtonLink to={`/@${writerUsername}/series/${seriesSlug}/${currentSequence + 1}`} disabled={!hasNext}>
        다음 챕터 <ChevronRightIcon />
      </ButtonLink>
    </CardFooter>
  );
}
