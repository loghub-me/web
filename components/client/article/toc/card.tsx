'use client';

import { useTOC } from '@/hooks/use-toc';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';
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
        {anchors.map(({ slug, text, level }) => (
          <ButtonLink
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            size={'sm'}
            variant={'ghost'}
            className={cn(
              'px-2 py-1.5 min-h-7 h-auto justify-start whitespace-normal',
              activeSlug === slug && 'border-border bg-accent'
            )}
            style={{ marginLeft: `${(level - 1) * 8}px` }}
          >
            {text}
          </ButtonLink>
        ))}
      </CardContent>
    </Card>
  );
}
