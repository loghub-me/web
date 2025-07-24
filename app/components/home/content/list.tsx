interface ContentListProps {
  children: React.ReactNode;
}

export default function ContentList({ children }: Readonly<ContentListProps>) {
  return <div className="flex flex-col lg:flex-row gap-6">{children}</div>;
}
