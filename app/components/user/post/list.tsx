interface UserPostListProps {
  children?: React.ReactNode;
}

export default function UserPostList({ children }: Readonly<UserPostListProps>) {
  return <div className="space-y-1">{children}</div>;
}
