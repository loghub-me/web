import { useEffect, useRef, useState } from 'react';
import { Card } from '~/components/ui/card';
import { cn } from '~/lib/utils';

interface ArticleDetailAsideProps {
  title: string;
  toc: Toc[];
}

export default function ArticleDetailAside({ title, toc }: Readonly<ArticleDetailAsideProps>) {
  const [activeSlug, setActiveSlug] = useState<string>('');
  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute('id');
          if (entry.isIntersecting && slug) {
            setActiveSlug(slug);
          }
        }),
      { root: null, rootMargin: '0px 0px -92% 0px', threshold: 0 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.slug) as HTMLHeadingElement | null;
      if (element) {
        headingRefs.current[item.slug] = element;
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  return (
    <Card className="sticky top-20 hidden lg:block max-w-xs w-full h-fit p-4 space-y-4">
      <h5 className="font-semibold text-lg">{title}</h5>
      <ul className="space-y-2">
        {toc.map((item) => {
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={cn(
                  'px-2 py-1 text-sm text-muted-foreground text-nowrap rounded-md transition-all hover:bg-accent',
                  item.slug === activeSlug && 'bg-accent font-bold text-foreground'
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
