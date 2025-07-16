interface SeriesListProps {
  children?: React.ReactNode;
}

export default function SeriesList({ children }: Readonly<SeriesListProps>) {
  return <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">{children}</div>;
}
