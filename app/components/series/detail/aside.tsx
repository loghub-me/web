interface SeriesDetailAsideProps {
  children?: React.ReactNode;
}

export default function SeriesDetailAside({ children }: Readonly<SeriesDetailAsideProps>) {
  return <aside className="md:max-w-96 md:min-w-96 w-full space-y-4 border-r">{children}</aside>;
}
