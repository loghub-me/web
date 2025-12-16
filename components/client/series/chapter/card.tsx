'use client';

import { ButtonLink } from '@ui/button-link';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { useParams } from 'next/navigation';

interface SeriesChapterCardProps {
  series: Pick<SeriesDetail, 'slug' | 'writer' | 'chapters'>;
}

export default function SeriesChapterCard({ series }: Readonly<SeriesChapterCardProps>) {
  const { slug, writer, chapters } = series;
  const { sequence: currentSequence } = useParams<{ sequence: string }>();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">챕터</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col gap-0.5">
        {chapters.length === 0 && <ListEmpty message={'아직 작성된 챕터가 없습니다.'} />}
        {chapters.map(({ id, title, sequence }) => {
          const href = `/series/${writer.username}/${slug}/${sequence}`;
          const isActive = currentSequence === sequence.toString();

          return (
            <ButtonLink
              key={id}
              href={href}
              variant={isActive ? 'secondary' : 'ghost'}
              className="py-1.5 min-h-9 h-auto justify-start"
            >
              <span className="font-bold text-primary">{sequence}.</span>
              <span className="whitespace-normal">{title}</span>
            </ButtonLink>
          );
        })}
      </CardContent>
    </Card>
  );
}
