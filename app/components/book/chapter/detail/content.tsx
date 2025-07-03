import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { CardContent } from '~/components/ui/card';

interface BookChapterDetailContentProps {
  title: string;
  content: { html: string };
  bookSlug: string;
  writerUsername: string;
  currentSequence: number;
  totalChapters: number;
}

export default function BookChapterDetailContent({
  bookSlug,
  title,
  content,
  writerUsername,
  currentSequence,
  totalChapters,
}: Readonly<BookChapterDetailContentProps>) {
  const hasPrev = currentSequence > 1;
  const hasNext = currentSequence < totalChapters;
  const navigate = useNavigate();

  return (
    <CardContent className="space-y-4">
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
      <div className="flex justify-between">
        <Button
          variant="ghost"
          disabled={!hasPrev}
          onClick={() => navigate(`/@${writerUsername}/books/${bookSlug}/${currentSequence - 1}`)}
        >
          <ChevronLeftIcon /> 이전 챕터
        </Button>
        <Button
          variant="ghost"
          disabled={!hasNext}
          onClick={() => navigate(`/@${writerUsername}/books/${bookSlug}/${currentSequence + 1}`)}
        >
          다음 챕터 <ChevronRightIcon />
        </Button>
      </div>
    </CardContent>
  );
}
