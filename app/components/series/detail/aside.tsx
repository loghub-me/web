interface SeriesDetailAsideProps {
  children?: React.ReactNode;
}

export default function SeriesDetailAside({ children }: Readonly<SeriesDetailAsideProps>) {
  return <aside className="pb-4 md:max-w-md w-full space-y-4 border-b md:border-b-0 md:border-r">{children}</aside>;
}
