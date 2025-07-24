import type { LucideIcon } from 'lucide-react';
import { TabsTrigger } from '~/components/ui/tabs';

interface FeatureTabsTriggerProps {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureTabsTrigger({
  value,
  title,
  description,
  icon: Icon,
}: Readonly<FeatureTabsTriggerProps>) {
  return (
    <TabsTrigger value={value}>
      <span className="flex items-center justify-center min-w-8 min-h-8 w-8 h-8 text-primary-foreground bg-primary rounded-md">
        <Icon className="size-4" />
      </span>
      <div className="text-left">
        <h5 className="font-semibold">{title}</h5>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </TabsTrigger>
  );
}
