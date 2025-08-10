import type { Route } from './+types/confirm';
import { UserIcon } from 'lucide-react';
import { LoginConfirmForm } from '~/components/auth';
import { createMetadata } from '~/constants/meta';
import { parseSearchParams } from '~/lib/parse';
import { loginConfirmSearchParamsSchema } from '~/schemas/auth';

export const meta: Route.MetaFunction = () => {
  const title = '로그인 확인';
  const description = '로그인 확인 페이지입니다. LogHub에 로그인하여 더 많은 기능을 이용해보세요.';
  return createMetadata(title, description);
};

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, loginConfirmSearchParamsSchema);
  return { searchParams };
}

export default function LoginConfirmRoute({ loaderData }: Route.ComponentProps) {
  const { searchParams } = loaderData;

  return (
    <main className="space-y-4 w-80">
      <div className="flex flex-col items-center gap-2 mb-6">
        <UserIcon className="p-2 size-10 bg-secondary rounded-full" />
        <h2 className="text-2xl font-bold">로그인</h2>
        <p className="text-sm text-center text-secondary-foreground">
          <span className="font-medium underline">{searchParams.email}</span>로 인증 메일을 발송했습니다. <br />
          메일에 포함된 링크를 클릭하여 로그인을 완료해주세요.
        </p>
      </div>
      <LoginConfirmForm {...searchParams} />
    </main>
  );
}
