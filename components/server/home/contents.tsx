import { ButtonLink } from '@ui/button';
import { NotepadTextIcon, LayersIcon, MessagesSquareIcon, TagIcon, ChevronRightIcon } from 'lucide-react';

export default function HomeContentsSection() {
  const CONTENTS = [
    {
      link: '/search/articles',
      title: '아티클',
      description: '아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.',
      icon: NotepadTextIcon,
    },
    {
      link: '/search/series',
      title: '시리즈',
      description: '시리즈는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.',
      icon: LayersIcon,
    },
    {
      link: '/search/questions',
      title: '질문',
      description: '질문은 사용자 간의 질문과 답변을 공유하는 공간입니다.',
      icon: MessagesSquareIcon,
    },
    {
      link: '/topics',
      title: '토픽',
      description: '토픽은 특정 주제에 대한 아티클과 시리즈를 모아볼 수 있는 카테고리입니다.',
      icon: TagIcon,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-16 space-y-8">
      <div className="space-y-2 md:text-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-primary">
          주요 컨텐츠를 탐색하세요
        </h3>
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 dark:from-gray-400 to-foreground">
          다양한 주제의 아티클, 시리즈, 질문을 통해 지식을 확장하고 커뮤니티와 소통하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {CONTENTS.map(({ link, title, description, icon: Icon }) => (
          <div key={link} className="flex-1 space-y-1">
            <div className="flex flex-row items-center gap-2.5">
              <Icon className="size-6" />
              <h5 className="text-lg font-semibold">{title}</h5>
              <ButtonLink href={link} variant={'ghost'} size={'icon'} className="ml-auto">
                <ChevronRightIcon />
              </ButtonLink>
            </div>
            <p className="text-medium text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
