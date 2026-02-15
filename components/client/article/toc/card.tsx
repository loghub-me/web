'use client';

import { useTOC } from '@/hooks/use-toc';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { MousePointerIcon } from 'lucide-react';
import Link from 'next/link';

interface ArticleTOCCardProps {
  article: Pick<ArticleDetail, 'anchors'>;
}

export default function ArticleTOCCard({ article }: Readonly<ArticleTOCCardProps>) {
  const { anchors } = article;
  const activeSlug = useTOC(anchors);

  return (
    <Card className="gap-3 max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">목차</CardTitle>
      </CardHeader>
      <CardContent className="px-6 space-y-2">
        {anchors.length === 0 && <ListEmpty className="p-2" message={'목차가 없습니다'} />}
        {anchors.map(({ slug, text, level }) => (
          <Link
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            className={cn(
              'block w-full text-sm break-all cursor-pointer underline-offset-4 hover:underline transition-all',
              activeSlug === slug ? 'font-semibold' : 'text-muted-foreground'
            )}
            style={{ marginLeft: `${(level - 1) * 8}px` }}
          >
            {text}
            {activeSlug === slug && <MousePointerIcon className="text-primary inline-block size-3 ml-2" />}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
