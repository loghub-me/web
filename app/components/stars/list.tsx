import React from 'react';

interface StarListProps {
  children?: React.ReactNode;
}

export default function StarList({ children }: Readonly<StarListProps>) {
  return <div className="space-y-4">{children}</div>;
}
