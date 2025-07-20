import { ButtonLink } from '~/components/ui/button';

interface TopicListProps {
  topic: Topic;
}

export default function TopicList({ topic }: Readonly<TopicListProps>) {
  const { slug, name } = topic;

  return (
    <ButtonLink to={`/topics/${slug}`} variant={'outline'} size={'custom'} className="flex-col p-4">
      <img src={`/icons/${slug}.svg`} alt={slug} className="size-8" />
      <span className="text-muted-foreground">{name}</span>
    </ButtonLink>
  );
}
