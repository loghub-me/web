import { XIcon } from 'lucide-react';
import { TopicImage } from '~/components/topic';
import { Badge } from '~/components/ui/badge';

interface TopicTagProps {
  topic: Topic;
  remove: () => void;
}

export default function TopicTag({ topic, remove }: Readonly<TopicTagProps>) {
  return (
    <Badge
      variant="outline"
      className="h-7 rounded-sm p-1 cursor-pointer transition-colors bg-card hover:bg-accent"
      onClick={remove}
    >
      <TopicImage topic={topic} />
      <span>{topic.name}</span>
      <XIcon className="text-muted-foreground" />
    </Badge>
  );
}
