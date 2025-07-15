import { ButtonLink } from '~/components/ui/button';

interface ArticleTocListProps {
  toc: Toc;
  isActive: boolean;
}

export default function ArticleTocList({ toc, isActive }: Readonly<ArticleTocListProps>) {
  const { level, title, slug } = toc;

  return (
    <ButtonLink to={`#${slug}`} className="w-full justify-start px-2.5">
      {title}
    </ButtonLink>
  );
}
