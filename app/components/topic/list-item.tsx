import { TopicImage } from '~/components/topic';
import { ButtonLink } from '~/components/ui/button';

interface TopicListProps {
  topic: Topic;
}

export default function TopicList({ topic }: Readonly<TopicListProps>) {
  const { slug, name } = topic;

  return (
    <ButtonLink to={`/topics/${slug}`} variant={'outline'} size={'custom'} className="flex-col p-4">
      <TopicImage topic={topic} size={'lg'} />
      <span className="text-muted-foreground">{topic.name}</span>
    </ButtonLink>
  );
}
