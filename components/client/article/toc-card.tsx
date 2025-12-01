'use client';

import { useTOC } from '@/hooks/use-toc';
import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';

interface ArticleTOCCardProps {
  article: Pick<ArticleDetail, 'anchors'>;
}

export default function ArticleTOCCard({ article }: Readonly<ArticleTOCCardProps>) {
  const { anchors } = article;
  const activeSlug = useTOC(anchors);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">목차</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col gap-0.5">
        {anchors.length === 0 && <ListEmpty className="p-2" message={'목차가 없습니다'} />}
        {anchors.map(({ slug, text }) => (
          <ButtonLink
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            size={'sm'}
            variant={activeSlug === slug ? 'secondary' : 'ghost'}
            className="px-2 py-1.5 min-h-9 h-auto justify-start whitespace-normal"
          >
            {text}
          </ButtonLink>
        ))}
      </CardContent>
    </Card>
  );
}
