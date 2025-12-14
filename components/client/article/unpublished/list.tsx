interface ArticleUnpublishedListProps {
  children?: React.ReactNode;
}

export default function ArticleUnpublishedList({ children }: Readonly<ArticleUnpublishedListProps>) {
  return <div className="border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
