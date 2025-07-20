interface TopicListProps {
  children?: React.ReactNode;
}

export default function TopicList({ children }: Readonly<TopicListProps>) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-2 md:gap-4">
      {children}
    </div>
  );
}
