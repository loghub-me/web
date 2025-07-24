import { TabsContent } from '~/components/ui/tabs';

interface FeatureTabsTriggerProps {
  value: string;
  title: string;
  imageSrc: string;
}

export default function FeatureTabsTrigger({ value, title, imageSrc }: Readonly<FeatureTabsTriggerProps>) {
  return (
    <TabsContent key={value} value={value} className="bg-accent border rounded-xl overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full aspect-video object-fill" />
    </TabsContent>
  );
}
