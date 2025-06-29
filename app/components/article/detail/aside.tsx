import { useEffect, useRef, useState } from 'react';
import { Card } from '~/components/ui/card';
import { UserCard } from '~/components/user';
import { cn } from '~/lib/utils';

interface ArticleDetailAsideProps {
  title: string;
  toc: Toc[];
  writer: User;
}

export default function ArticleDetailAside({ title, toc, writer }: Readonly<ArticleDetailAsideProps>) {
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
    <aside className="sticky top-4 hidden lg:block max-w-xs w-full h-fit space-y-4">
      <Card className="pt-0">
        <div className="p-4 min-h-16 border-b">
          <h5 className="font-semibold text-lg">{title}</h5>
        </div>
        <ul className="px-4 space-y-2">
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
      <UserCard user={writer} title={'작성자 정보'} />
    </aside>
  );
}
