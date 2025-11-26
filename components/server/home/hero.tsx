import { TopicIcon } from '@/components/client/topic';
import Logo from '@/components/global/logo';
import { TOPICS } from '@/constants/topics';
import { ButtonLink } from '@ui/button';
import { OrbitingCircle } from '@ui/orbiting-circle';
import { ChevronRightIcon, TextIcon } from 'lucide-react';

export default function HomeHeroSection() {
  const circles = [TOPICS.slice(0, 11), TOPICS.slice(12, 24)];

  return (
    <section className="flex flex-col items-center justify-center gap-2 md:gap-4 h-screen pb-16">
      {circles.map((topics, index) => (
        <OrbitingCircle
          key={index}
          iconSize={Math.round((28 - index * 4) * 1.25)}
          radius={Math.round((196 + index * 72) * 1.25)}
          reverse={index % 2 === 1}
          className="absolute -z-1"
        >
          {topics.map((topic) => (
            <TopicIcon key={topic.slug} {...topic} size={Math.round((28 - index * 4) * 1.25)} />
          ))}
        </OrbitingCircle>
      ))}
      <Logo width={256} height={64} className="w-48 md:w-56" />
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-primary">
        개발자들을 위한 지식 공유 플랫폼
      </h2>
      <h3 className="text-xl md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 dark:from-gray-400 to-foreground">
        LogHub와 함께 당신의 지식을 나누세요!
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-4">
        <ButtonLink href={'/post'} variant={'outline'} size={'lg'} className="has-[>svg]:pl-3 has-[>svg]:pr-2">
          <TextIcon /> 포스트 작성하기 <ChevronRightIcon className="text-muted-foreground" />
        </ButtonLink>
        <div className="flex gap-2">
          <ButtonLink
            variant={'ghost'}
            href={process.env.NEXT_PUBLIC_GITHUB_URL!}
            target={'_blank'}
            size={'icon'}
            prefetch={false}
          >
            <TopicIcon slug="github" name="GitHub" />
          </ButtonLink>
          <ButtonLink
            variant={'ghost'}
            href={process.env.NEXT_PUBLIC_DISCORD_URL!}
            target={'_blank'}
            size={'icon'}
            prefetch={false}
          >
            <TopicIcon slug="discord" name="Discord" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
