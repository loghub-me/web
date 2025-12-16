import { getRandomNotFoundQuote } from '@/constants/quotes';
import { ButtonLink } from '@ui/button-link';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@ui/empty';
import { HomeIcon, MailIcon } from 'lucide-react';

export default function NotFoundPage() {
  const randomQuote = getRandomNotFoundQuote();

  return (
    <main className="container flex flex-col items-center gap-4 justify-center mx-auto p-4 min-h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>404 | Not Found</EmptyTitle>
          <EmptyDescription>{randomQuote}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="md:flex-row justify-center gap-2">
          <ButtonLink href={'/support'} variant={'secondary'}>
            <MailIcon /> 문제 신고하기
          </ButtonLink>
          <ButtonLink href={'/'} variant={'outline'}>
            <HomeIcon /> 홈으로 돌아가기
          </ButtonLink>
        </EmptyContent>
      </Empty>
    </main>
  );
}
