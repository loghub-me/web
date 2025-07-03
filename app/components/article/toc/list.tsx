interface ArticleTocListProps {
  children?: React.ReactNode;
}

export default function ArticleTocList({ children }: Readonly<ArticleTocListProps>) {
  return <div className="space-y-1">{children}</div>;
}
