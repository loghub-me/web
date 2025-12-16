import { Badge } from '@ui/badge';
import { Separator } from '@ui/separator';
import { TabsTrigger } from '@ui/tabs';
import { LucideIcon } from 'lucide-react';

export default function FeatureTabsTrigger({
  value,
  title,
  description,
  icon: Icon,
}: Readonly<{
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>) {
  return (
    <TabsTrigger value={value} className="w-full gap-3">
      <Badge variant={'outline'} size={'lg'} className="w-auto h-auto p-2 rounded-sm">
        <Icon className="size-6" />
      </Badge>
      <Separator orientation="vertical" className="h-6 my-auto" />
      <div className="w-full text-left">
        <h5 className="font-semibold">{title}</h5>
        <p className="text-sm text-muted-foreground whitespace-break-spaces">{description}</p>
      </div>
    </TabsTrigger>
  );
}
