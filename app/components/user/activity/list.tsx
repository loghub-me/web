import React from 'react';

interface UserActivityListProps {
  children?: React.ReactNode;
}

export default function UserActivityList({ children }: Readonly<UserActivityListProps>) {
  return <div className="space-y-1">{children}</div>;
}
