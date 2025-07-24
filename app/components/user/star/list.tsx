import React from 'react';

interface UserStarListProps {
  children?: React.ReactNode;
}

export default function UserStarList({ children }: Readonly<UserStarListProps>) {
  return <div className="space-y-2">{children}</div>;
}
