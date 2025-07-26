import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

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
    <div className="mt-auto flex justify-between">
      <ButtonLink
        to={`/@${writerUsername}/series/${seriesSlug}/${currentSequence - 1}`}
        variant={'outline'}
        disabled={!hasPrev}
      >
        <ChevronLeftIcon /> 이전 챕터
      </ButtonLink>
      <ButtonLink
        to={`/@${writerUsername}/series/${seriesSlug}/${currentSequence + 1}`}
        variant={'outline'}
        disabled={!hasNext}
      >
        다음 챕터 <ChevronRightIcon />
      </ButtonLink>
    </div>
  );
}
