interface BookListProps {
  children?: React.ReactNode;
}

export default function BookList({ children }: Readonly<BookListProps>) {
  return <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">{children}</div>;
}
