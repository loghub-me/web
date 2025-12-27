import { SocialJoinConfirmForm } from '@/components/client/auth';
import Symbol from '@/components/global/symbol';
import { parseObject } from '@/lib/parse';
import { oauth2JoinConfirmSearchParamsSchema } from '@/schemas/auth';
import { Metadata } from 'next';

const title = '소셜 계정 회원가입';
const description = '회원가입을 위해 폼을 입력해주세요.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: `${process.env.WEB_HOST}/join/confirm/social` },
  twitter: { card: 'summary', title, description },
};

export default async function JoinConfirmSocialPage({ searchParams }: PageProps<'/join/confirm/social'>) {
  const parsedSearchParams = parseObject(await searchParams, oauth2JoinConfirmSearchParamsSchema);

  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">회원가입</h2>
          <p className="text-sm text-muted-foreground">회원가입을 위해 폼을 입력해주세요.</p>
        </div>
        <SocialJoinConfirmForm defaultValues={parsedSearchParams} />
      </div>
    </section>
  );
}
