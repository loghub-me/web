interface SeriesListProps {
  children?: React.ReactNode;
}

export default function SeriesList({ children }: Readonly<SeriesListProps>) {
  return <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">{children}</div>;
}
