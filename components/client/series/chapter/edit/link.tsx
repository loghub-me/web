'use client';

import { useAuth } from '@/hooks/use-auth';
import { ButtonLink } from '@ui/button';
import { PencilIcon } from 'lucide-react';

interface SeriesChapterEditLinkProps {
  series: Pick<Series, 'id' | 'writer'>;
  chapter: Pick<SeriesChapterDetail, 'id'>;
}

export default function SeriesChapterEditLink({ series, chapter }: Readonly<SeriesChapterEditLinkProps>) {
  const { session } = useAuth();
  const { writer } = series;

  return (
    session?.id === writer.id && (
      <ButtonLink href={`/edit/series/${series.id}/chapters/${chapter.id}`} size={'icon'}>
        <PencilIcon />
      </ButtonLink>
    )
  );
}
