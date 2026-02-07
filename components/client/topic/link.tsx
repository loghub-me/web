import { TopicIcon } from '@/components/client/topic';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import Link from 'next/link';

interface TopicLinkProps {
  topic: Topic;
  variant?: 'outline' | 'ghost';
  className?: string;
}

export default function TopicLink({ topic, variant = 'outline', className }: Readonly<TopicLinkProps>) {
  return (
    <Badge
      variant={variant}
      className={cn(
        'h-7 rounded-sm p-1 transition-colors hover:text-accent-foreground hover:bg-accent cursor-pointer',
        className
      )}
      render={<Link href={`/topics/${topic.slug}`} prefetch={false} />}
    >
      <TopicIcon {...topic} /> {topic.name}
    </Badge>
  );
}
