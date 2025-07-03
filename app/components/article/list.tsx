interface ArticleListProps {
  children?: React.ReactNode;
}

export default function ArticleList({ children }: Readonly<ArticleListProps>) {
  return <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">{children}</div>;
}
