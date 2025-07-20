interface SeriesChapterEditListProps {
  children?: React.ReactNode;
}

export default function SeriesChapterEditList({ children }: Readonly<SeriesChapterEditListProps>) {
  return <div className="px-4 space-y-2">{children}</div>;
}
