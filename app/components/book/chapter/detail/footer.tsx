import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { CardFooter } from '~/components/ui/card';

interface BookChapterDetailFooterProps {
  bookSlug: string;
  writerUsername: string;
  currentSequence: number;
  totalChapters: number;
}

export default function BookChapterDetailFooter({
  bookSlug,
  writerUsername,
  currentSequence,
  totalChapters,
}: Readonly<BookChapterDetailFooterProps>) {
  const hasPrev = currentSequence > 1;
  const hasNext = currentSequence < totalChapters;

  return (
    <CardFooter className="flex justify-between">
      <ButtonLink to={`/@${writerUsername}/books/${bookSlug}/${currentSequence - 1}`} disabled={!hasPrev}>
        <ChevronLeftIcon /> 이전 챕터
      </ButtonLink>
      <ButtonLink to={`/@${writerUsername}/books/${bookSlug}/${currentSequence + 1}`} disabled={!hasNext}>
        다음 챕터 <ChevronRightIcon />
      </ButtonLink>
    </CardFooter>
  );
}
