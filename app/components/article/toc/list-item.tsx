import { ButtonLink } from '~/components/ui/button';

interface ArticleTocListProps {
  toc: Toc;
  isActive: boolean;
}

export default function ArticleTocList({ toc, isActive }: Readonly<ArticleTocListProps>) {
  const { title, slug } = toc;

  return (
    <ButtonLink
      to={`#${encodeURIComponent(slug)}`}
      variant={isActive ? 'secondary' : 'ghost'}
      className="px-2 w-full justify-start"
    >
      {title}
    </ButtonLink>
  );
}
