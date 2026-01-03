interface SeriesAsideRightProps {
  children: React.ReactNode;
}

export default function SeriesAsideRight({ children }: Readonly<SeriesAsideRightProps>) {
  return <aside className="sticky top-4 hidden xl:block max-w-xs w-full h-fit space-y-3">{children}</aside>;
}
