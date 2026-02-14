import { cn } from '@/lib/utils';

interface ArticleAsideLeftProps {
  compact: boolean;
  children: React.ReactNode;
}

export default function ArticleAsideLeft({ compact, children }: Readonly<ArticleAsideLeftProps>) {
  return (
    <aside
      className={cn(
        'sticky top-4 hidden xl:flex justify-end h-fit',
        'transition-[width] ease-in-out overflow-hidden shrink-0',
        compact ? 'w-[20rem]' : 'w-12'
      )}
    >
      {children}
    </aside>
  );
}
