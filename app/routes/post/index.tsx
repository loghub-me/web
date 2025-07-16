import { KeyboardIcon, LayersIcon, MessageCircleQuestionIcon, NewspaperIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { cn } from '~/lib/utils';

const navLinks = [
  {
    to: '/post/articles',
    label: '아티클 작성하기',
    description: '아티클을 작성하고, 다른 사람들과 공유해보세요.',
    icon: NewspaperIcon,
  },
  {
    to: '/post/series',
    label: '시리즈 작성하기',
    description: '시리즈를 작성하고, 다른 사람들과 공유해보세요.',
    icon: LayersIcon,
  },
  {
    to: '/post/questions',
    label: '질문 작성하기',
    description: '질문을 작성하고, 다른 사람들과 공유해보세요.',
    icon: MessageCircleQuestionIcon,
  },
];

export default function PostIndex() {
  return (
    <main className="container max-h-screen h-screen mx-auto p-4 pt-16">
      <div className="p-16 space-y-4 text-center">
        <h1 className="font-bold text-3xl">글쓰기</h1>
        <p className="text-muted-foreground ">
          글을 작성하고, 다른 사람들과 공유해보세요. <br />
          글은 Markdown으로 작성할 수 있습니다.
        </p>
        <ButtonLink to={'/manual/markdown'} variant={'default'}>
          <KeyboardIcon /> 마크다운 사용법
        </ButtonLink>
      </div>
      <div className="overflow-hidden rounded-xl border flex">
        {navLinks.map(({ to, label, description, icon: Icon }) => (
          <Card
            key={to}
            className={cn('p-6 w-full flex flex-col gap-1 border-0 border-r last:border-r-0 rounded-none')}
          >
            <Icon className="mb-2" />
            <div>
              <h3 className="font-semibold">{label}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <ButtonLink to={to} className={'mt-auto'} variant={'outline'}>
              {label}
            </ButtonLink>
          </Card>
        ))}
      </div>
    </main>
  );
}
