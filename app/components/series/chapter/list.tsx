interface SeriesChapterListProps {
  children?: React.ReactNode;
}

export default function SeriesChapterList({ children }: Readonly<SeriesChapterListProps>) {
  return <div className="px-4 space-y-2">{children}</div>;
}
