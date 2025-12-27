import { parseObject } from '@/lib/parse';
import { safeLinkSchema } from '@/schemas/safe-link';
import { ButtonLink } from '@ui/button-link';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { Metadata } from 'next';

const title = '안전하게 링크 이동';
const description = '안전하게 외부 링크로 이동할 수 있도록 도와줍니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/safe-link` },
  twitter: { card: 'summary', title, description },
};

export default async function SafeLinkPage({ searchParams }: PageProps<'/safe-link'>) {
  const { url } = parseObject(await searchParams, safeLinkSchema);

  return (
    <main className="container flex items-center justify-center mx-auto px-4 min-h-screen space-y-4">
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="space-y-1.5 pb-4 border-b">
          <CardTitle>안전하게 링크로 이동</CardTitle>
          <CardDescription className="break-words">
            <span className="text-primary underline">{url}</span>로 이동하시겠습니까?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <ButtonLink href="/" className="mr-2">
            <HomeIcon /> 홈으로 돌아가기
          </ButtonLink>
          <ButtonLink variant={'default'} href={url} target={'_self'}>
            <ChevronRightIcon /> 이동하기
          </ButtonLink>
        </CardFooter>
      </Card>
    </main>
  );
}
