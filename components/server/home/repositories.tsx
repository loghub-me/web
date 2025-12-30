import { TopicIcon, TopicLink } from '@/components/client/topic';
import { ButtonLink } from '@ui/button-link';
import { GlobeIcon, ServerCogIcon, ServerIcon, ShredderIcon } from 'lucide-react';

export default function HomeRepositoriesSection() {
  const REPOSITORIES = [
    {
      link: 'https://github.com/loghub-me/web',
      title: 'loghub-me/web',
      description: 'LogHub의 웹 애플리케이션 레포지토리입니다. Next.js와 TypeScript로 작성되었습니다.',
      icon: GlobeIcon,
      topics: [
        { slug: 'nextjs', name: 'Next.js' },
        { slug: 'typescript', name: 'TypeScript' },
      ] satisfies Topic[],
    },
    {
      link: 'https://github.com/loghub-me/api',
      title: 'loghub-me/api',
      description: 'LogHub의 API 서버 레포지토리입니다. Spring Boot + Kotlin로 작성되었습니다.',
      icon: ServerIcon,
      topics: [
        { slug: 'spring-boot', name: 'Spring Boot' },
        { slug: 'kotlin', name: 'Kotlin' },
      ] satisfies Topic[],
    },
    {
      link: 'https://github.com/loghub-me/task-api',
      title: 'loghub-me/task-api',
      description:
        'LogHub의 보조 작업을 처리하는 Task API 서버 레포지토리입니다. Elysia + TypeScript로 작성되었습니다.',
      icon: ServerCogIcon,
      topics: [
        { slug: 'elysia', name: 'Elysia' },
        { slug: 'typescript', name: 'TypeScript' },
      ] satisfies Topic[],
    },
    {
      link: 'https://github.com/loghub-me/markdown-renderer',
      title: 'loghub-me/markdown-renderer',
      description: 'LogHub의 마크다운 렌더링 엔진 레포지토리입니다. Markdown-it 기반으로 작성되었습니다.',
      icon: ShredderIcon,
      topics: [
        { slug: 'markdown', name: 'Markdown' },
        { slug: 'typescript', name: 'TypeScript' },
      ] satisfies Topic[],
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-6xl px-16 space-y-8">
      <div className="space-y-2 md:text-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-primary">
          LogHub는 완전한 오픈소스입니다
        </h3>
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 dark:from-gray-400 to-foreground">
          언제든지 소스 코드를 확인하고 기여할 수 있습니다. 피드백, PR, 이슈 모두 환영합니다!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REPOSITORIES.map(({ link, title, description, topics, icon: Icon }) => (
          <div key={link} className="flex-1 space-y-1">
            <div className="flex flex-row items-center gap-2.5">
              <Icon className="min-w-5 min-h-5 size-5" />
              <h5 className="text-lg font-semibold">{title}</h5>
              <ButtonLink href={link} target={'_blank'} variant={'ghost'} size={'icon'} className="ml-auto">
                <TopicIcon slug={'github'} name={'GitHub'} />
              </ButtonLink>
            </div>
            <p className="text-medium text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-1">
              {topics.map((topic) => (
                <TopicLink key={topic.slug} topic={topic} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
