interface ArticleAsideRightProps {
  children: React.ReactNode;
}

export default function ArticleAsideRight({ children }: Readonly<ArticleAsideRightProps>) {
  return <aside className="sticky top-4 hidden lg:block max-w-xs w-full h-fit space-y-4">{children}</aside>;
}
