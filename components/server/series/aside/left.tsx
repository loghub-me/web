interface SeriesAsideLeftProps {
  children: React.ReactNode;
}

export default function SeriesAsideLeft({ children }: Readonly<SeriesAsideLeftProps>) {
  return <aside className="md:max-w-xs w-full space-y-4">{children}</aside>;
}
