interface BookChapterListProps {
  children?: React.ReactNode;
}

export default function BookChapterList({ children }: Readonly<BookChapterListProps>) {
  return <div className="px-4 space-y-2">{children}</div>;
}
