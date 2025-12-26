interface ArticleListProps {
  children?: React.ReactNode;
}

export default function ArticleList({ children }: Readonly<ArticleListProps>) {
  return <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>;
}
