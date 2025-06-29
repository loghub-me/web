import React from 'react';

interface QuestionListProps {
  children?: React.ReactNode;
}

export default function QuestionList({ children }: Readonly<QuestionListProps>) {
  return <div className="space-y-4">{children}</div>;
}
