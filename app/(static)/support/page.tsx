import { InquiryForm } from '@/components/client/support';
import { TopicIcon } from '@/components/client/topic';
import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default function SupportPage() {
  return (
    <main className="container flex flex-col md:flex-row gap-8 mx-auto pt-36 p-4 min-h-screen">
      <section className="px-4 md:flex-1">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">문의하기</h2>
          <p>서비스 운영과 관련된 기술적 문제나 오류는 가능한 범위 내에서 신속히 해결하도록 노력합니다.</p>
          <div className="-ml-2">
            <ButtonLink variant={'ghost'} href={process.env.NEXT_PUBLIC_GITHUB_URL!} target={'_blank'} size={'icon'}>
              <TopicIcon slug="github" name="GitHub" />
            </ButtonLink>
            <ButtonLink variant={'ghost'} href={process.env.NEXT_PUBLIC_DISCORD_URL!} target={'_blank'} size={'icon'}>
              <TopicIcon slug="discord" name="Discord" />
            </ButtonLink>
          </div>
          <p className="text-muted-foreground">GitHub Issue를 통해 기술적인 문제를 남겨주셔도 좋습니다!</p>
        </div>
      </section>
      <p></p>
      <section className="md:flex-1">
        <Card>
          <CardHeader className="pb-4 border-b space-y-1.5">
            <CardTitle>문의 폼</CardTitle>
            <CardDescription>문의를 위해 폼을 작성해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <InquiryForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
