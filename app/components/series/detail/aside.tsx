interface SeriesDetailAsideProps {
  children?: React.ReactNode;
}

export default function SeriesDetailAside({ children }: Readonly<SeriesDetailAsideProps>) {
  return (
    <aside className="pb-4 md:max-w-96 w-full space-y-4 bg-card border-b md:border-b-0 md:border-r shadow-lg">
      {children}
    </aside>
  );
}
