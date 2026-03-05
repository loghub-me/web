import { EmailBlockForm } from '@/components/client/auth';
import Symbol from '@/components/global/symbol';
import { parseObject } from '@/lib/parse';
import { emailBlockSearchParamsSchema } from '@/schemas/auth';
import { Metadata } from 'next';

const title = '이메일 차단';
const description = '본인이 요청하지 않은 가입 시도라면, 이메일 임시 차단을 요청할 수 있습니다.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/join/email/block` },
  twitter: { card: 'summary', title, description },
};

export default async function EmailBlockPage({ searchParams }: PageProps<'/email/block'>) {
  const parsedSearchParams = parseObject(await searchParams, emailBlockSearchParamsSchema);

  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">이메일 차단</h2>
          <p className="text-sm text-muted-foreground">
            본인이 요청하지 않은 가입 시도라면, 이메일 임시 차단을 요청할 수 있습니다.
          </p>
        </div>
        <EmailBlockForm defaultValues={parsedSearchParams} />
      </div>
    </section>
  );
}
