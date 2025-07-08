import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface TrendingListProps {
  title: string;
  children?: React.ReactNode;
}

export default function TrendingList({ title, children }: Readonly<TrendingListProps>) {
  return (
    <Card className="flex-1 overflow-hidden">
      <CardHeader className="border-b bg-accent py-4">
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 space-y-1">{children}</CardContent>
    </Card>
  );
}
