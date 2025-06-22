interface AnswerListProps {
  children?: React.ReactNode;
}

export default function AnswerList({ children }: Readonly<AnswerListProps>) {
  return (
    <div className="relative space-y-4">
      <hr className="absolute -z-10 top-0 left-8 w-1 h-full bg-border" />
      {children}
      <hr className="absolute -z-10 top-0 right-8 w-1 h-full bg-border" />
    </div>
  );
}
