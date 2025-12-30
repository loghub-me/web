import { TopicIcon } from '@/components/client/topic';
import { TOPICS } from '@/constants/topics';
import { ButtonLink } from '@ui/button-link';
import { OrbitingCircle } from '@ui/orbiting-circle';
import { ChevronRightIcon, TagIcon } from 'lucide-react';

export default function HomeTopicsSection() {
  const topics = TOPICS.slice(0, 8);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 mx-auto px-16 max-w-4xl space-y-8">
      <div className="max-w-sm space-y-2 text-left">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-primary">
          다양한 토픽을 탐색하세요
        </h3>
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 dark:from-gray-400 to-foreground">
          LohHub는 토픽을 통해 사용자들이 관심 있는 주제에 대해 더 쉽게 접근하고 탐색할 수 있도록 도와줍니다.
        </p>
        <ButtonLink href={'/topics'} variant={'outline'} size={'lg'} className="mt-2 has-[>svg]:pl-3 has-[>svg]:pr-2">
          <TagIcon /> 토픽 찾기 <ChevronRightIcon className="text-muted-foreground" />
        </ButtonLink>
      </div>
      <OrbitingCircle iconSize={38} radius={128}>
        {topics.map((topic) => (
          <TopicIcon key={topic.slug} {...topic} size={38} />
        ))}
      </OrbitingCircle>
    </section>
  );
}
