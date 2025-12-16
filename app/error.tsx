'use client';

import { getRandomServerErrorQuote } from '@/constants/quotes';
import { ButtonLink } from '@ui/button-link';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@ui/empty';
import { HomeIcon, MailIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  const randomQuote = getRandomServerErrorQuote();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container flex flex-col items-center gap-4 justify-center mx-auto p-4 min-h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>이런! | 무언가 굉장히 잘못되었습니다.</EmptyTitle>
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
