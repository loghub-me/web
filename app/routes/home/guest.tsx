import Logo from '~/components/global/logo';
import { HomeCardContent, HomeDescription, HomeHelpButton, HomeIntroduceVideo, HomeLinks } from '~/components/home';
import { BlurFade } from '~/components/ui/blur-fade';
import { GlowEffect } from '~/components/ui/glow-effect';

const contentCards = [
  {
    title: '아티클',
    description: '아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.',
    link: '/search/articles',
  },
  {
    title: '도서',
    description: '도서는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.',
    link: '/search/books',
  },
  {
    title: '질문',
    description: '질문은 사용자 간의 질문과 답변을 공유하는 공간입니다.',
    link: '/search/questions',
  },
];

export default function GuestHomeRoute() {
  return (
    <main className="container mx-auto p-4 pt-32 pb-16 min-h-screen space-y-16">
      <section className="space-y-8">
        <BlurFade delay={0.1} className="flex justify-center gap-2">
          <HomeHelpButton />
        </BlurFade>
        <BlurFade as="h1" delay={0.2}>
          <Logo width={256} height={64} className={'mx-auto'} />
        </BlurFade>
        <BlurFade as={'p'} delay={0.3} className="px-8 text-center text-muted-foreground font-medium leading-snug">
          <HomeDescription />
        </BlurFade>
        <BlurFade delay={0.4}>
          <HomeLinks />
        </BlurFade>
        <BlurFade
          delay={0.5}
          direction={'up'}
          offset={10}
          className="relative mx-auto mt-16 p-2 max-w-6xl w-full border-2 rounded-xl shadow-xl"
        >
          <GlowEffect
            mode={'rotate'}
            duration={10}
            colors={['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD']}
            className="-z-1 scale-100 opacity-50"
          />
          <HomeIntroduceVideo />
        </BlurFade>
      </section>
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">다양한 콘텐츠를 탐색해보세요</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {contentCards.map((card, index) => (
            <HomeCardContent key={index} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
