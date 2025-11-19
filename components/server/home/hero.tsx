import Logo from '@/components/global/logo';
import { ButtonLink } from '@ui/button';
import { PencilIcon } from 'lucide-react';

export default function HomeHeroSection() {
  return (
    <section className="px-4 py-16 flex flex-col items-center gap-6">
      <ButtonLink href={'/post'} variant={'outline'} className="pl-1.5 pr-2.5 rounded-full">
        <span className={'p-1 text-accent-foreground bg-accent border rounded-full'}>
          <PencilIcon className="size-3 stroke-2.5" />
        </span>
        지금 바로 시작해보세요!
      </ButtonLink>
      <Logo width={256} height={64} />
      <p className="text-center text-muted-foreground">
        LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.
        <br />
        회원 가입 후 다양한 포스트를 작성하고, 다른 사람들과 소통해보세요!
      </p>
    </section>
  );
}
