import { TopicIcon } from '@/components/client/topic';
import ThemedImage from '@/components/global/themed-image';
import { POST_LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';
import { ButtonGroup } from '@ui/button-group';
import { LightRays } from '@ui/light-rays';
import { LucideIcon, PencilIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '포스트',
  description: '아티클, 시리즈, 질문, 답변 등 다양한 글을 작성하고 공유해보세요.',
};

export default function PostPortalPage() {
  return (
    <main className="mx-auto p-4 pt-20 max-w-3xl w-full min-h-screen space-y-4">
      <div className="py-12 space-y-4 text-center">
        <h2 className="text-center font-semibold text-2xl">무엇을 작성하시겠어요?</h2>
        <p className="text-muted-foreground">아티클, 시리즈, 질문, 답변 등 다양한 글을 작성하고 공유해보세요.</p>
      </div>
      <PostBentoGrid>
        {POST_LINKS.map((card) => (
          <PostBentoGridItem key={card.href} {...card} />
        ))}
      </PostBentoGrid>
      <div className="py-8 space-y-3 text-center">
        <p className="text-sm text-muted-foreground">포스트 작성에 도움이 필요하신가요? 가이드를 확인해보세요.</p>
        <ButtonGroup className="mx-auto">
          <ButtonLink href={'/manual#post'} variant={'outline'} size={'lg'} className="pl-1.5 pr-2.5 rounded-full">
            <span className={'p-1.5 text-accent-foreground bg-accent border rounded-full'}>
              <PencilIcon className="size-3.5 stroke-2.5" />
            </span>
            포스트 가이드 보기
          </ButtonLink>
          <ButtonLink href={'/manual#markdown'} variant={'outline'} size={'lg'} className="pl-1.5 pr-2.5 rounded-full">
            <span className={'p-1.5 text-accent-foreground bg-accent border rounded-full'}>
              <TopicIcon slug={'markdown'} name={'Markdown'} size={14} />
            </span>
            마크다운 가이드 보기
          </ButtonLink>
        </ButtonGroup>
      </div>
    </main>
  );
}

interface PostBentoGridProps {
  children: React.ReactNode;
}

function PostBentoGrid({ children }: Readonly<PostBentoGridProps>) {
  return <div className="grid grid-cols-1 md:grid-cols-5 gap-4">{children}</div>;
}

interface PostBentoGridItemProps {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  style: string;
  image: {
    light: string;
    dark: string;
  };
}

function PostBentoGridItem({ href, label, description, style, image, icon: Icon }: Readonly<PostBentoGridItemProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative h-56 border rounded-xl shadow-xs transition-colors bg-card/50 hover:bg-card overflow-hidden',
        style
      )}
    >
      <LightRays
        raysColor="#00ffff"
        lightSpread={1.5}
        className="custom-rays opacity-0 transition-opacity group-hover:opacity-50 dark:group-hover:opacity-50 duration-500"
      />
      <ThemedImage
        src={image}
        alt={label}
        className="object-cover object-top transition-[filter] blur-xs group-hover:blur-sm duration-500"
        fill
      />
      <div className="absolute top-2 left-2 px-3 py-2 space-y-1.5 bg-card/50 border rounded-md backdrop-blur-sm transition-[top,left] group-hover:top-4 group-hover:left-4">
        <h3 className="font-semibold">
          <Icon className="size-4 inline-block mr-1" /> {label}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
