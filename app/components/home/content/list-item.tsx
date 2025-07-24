import type { LucideIcon } from 'lucide-react';

interface ContentListItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ContentListItem({ title, description, icon: Icon }: Readonly<ContentListItemProps>) {
  return (
    <div className="w-full space-y-2">
      <span className="inline-block p-3 text-accent-foreground bg-accent rounded-full">
        <Icon className="size-6" />
      </span>
      <div className="px-1 space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
