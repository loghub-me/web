import { TopicIcon } from '@/components/client/topic';
import { ButtonLink } from '@ui/button-link';

interface TopicListProps {
  topic: Topic;
}

export default function TopicList({ topic }: Readonly<TopicListProps>) {
  const { slug, name } = topic;

  return (
    <ButtonLink href={`/topics/${slug}`} variant={'outline'} className="flex-col p-4 h-auto">
      <TopicIcon {...topic} size={'lg'} />
      <span className="text-muted-foreground">{name}</span>
    </ButtonLink>
  );
}
