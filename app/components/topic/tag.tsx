import { XIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

interface TopicTagProps {
  topic: Topic;
  remove: () => void;
}

export default function TopicTag({ topic: { slug, name }, remove }: Readonly<TopicTagProps>) {
  return (
    <Badge
      variant="outline"
      className="h-7 rounded-sm p-1 cursor-pointer transition-colors hover:bg-accent"
      onClick={remove}
    >
      <img src={`/icons/${slug}.svg`} alt={name} className="size-4 dark:hidden" />
      <img src={`/icons/${slug}-dark.svg`} alt={name} className="size-4 not-dark:hidden" />
      <span>{name}</span>
      <XIcon />
    </Badge>
  );
}
