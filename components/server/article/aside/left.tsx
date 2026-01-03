interface ArticleAsideLeftProps {
  children: React.ReactNode;
}

export default function ArticleAsideLeft({ children }: Readonly<ArticleAsideLeftProps>) {
  return <aside className="sticky top-4 hidden xl:block max-w-xs w-full h-fit space-y-4">{children}</aside>;
}
