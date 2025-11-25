'use client';

import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { usePathname } from 'next/navigation';

interface SeriesChapterCardProps {
  writerUsername: string;
  slug: string;
  chapters: SeriesChapter[];
}

export default function SeriesChapterCard({ writerUsername, slug, chapters }: Readonly<SeriesChapterCardProps>) {
  const pathname = usePathname();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">챕터</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col gap-0.5">
        {chapters.length === 0 && <ListEmpty message={'아직 작성된 챕터가 없습니다.'} />}
        {chapters.map(({ id, title, sequence }) => {
          const href = `/series/${writerUsername}/${slug}/${sequence}`;
          const isActive = pathname === href;

          return (
            <ButtonLink
              key={id}
              href={href}
              variant={isActive ? 'secondary' : 'ghost'}
              className="px-2 items-start justify-start gap-1.5 h-auto"
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
