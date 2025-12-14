interface ArticleForImportListProps {
  children?: React.ReactNode;
}

export default function ArticleForImportList({ children }: Readonly<ArticleForImportListProps>) {
  return <div className="border rounded-xl shadow-xs max-h-128 overflow-y-auto">{children}</div>;
}
