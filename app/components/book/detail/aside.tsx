interface BookDetailAsideProps {
  children?: React.ReactNode;
}

export default function BookDetailAside({ children }: Readonly<BookDetailAsideProps>) {
  return <aside className="pb-4 md:max-w-md w-full space-y-4 border-b md:border-b-0 md:border-r">{children}</aside>;
}
