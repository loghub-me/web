import { useEffect, useState } from 'react';
import { ArticleTocList, ArticleTocListItem } from '~/components/article';
import { Card } from '~/components/ui/card';

interface ArticleTocCardProps {
  toc: Toc[];
}

export default function ArticleTocCard({ toc }: Readonly<ArticleTocCardProps>) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute('id');
          setActiveSlug((prev) => (entry.isIntersecting && slug ? slug : prev));
        }),
      { root: null, rootMargin: '0px 0px -92% 0px', threshold: 0 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.slug) as HTMLHeadingElement | null;
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  return (
    <Card className="p-2 pb-4">
      <h2 className="p-4 text-lg font-semibold">목차</h2>
      <ArticleTocList>
        {toc.map((item) => (
          <ArticleTocListItem key={item.slug} toc={item} isActive={item.slug === activeSlug} />
        ))}
      </ArticleTocList>
    </Card>
  );
}
