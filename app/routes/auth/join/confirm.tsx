import type { Route } from './+types/confirm';
import { UserIcon } from 'lucide-react';
import { JoinConfirmForm } from '~/components/auth';
import { parseSearchParams } from '~/lib/parse';
import { joinConfirmSearchParamsSchema } from '~/schemas/auth';

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = parseSearchParams(url.searchParams, joinConfirmSearchParamsSchema);
  return { searchParams };
}

export default function JoinConfirmRoute({ loaderData }: Route.ComponentProps) {
  const { searchParams } = loaderData;

  return (
    <main className="space-y-4 w-80">
      <div className="flex flex-col items-center gap-2 mb-6">
        <UserIcon className="p-2 size-10 bg-secondary rounded-full" />
        <h2 className="text-2xl font-bold">회원가입</h2>
        <p className="text-sm text-center text-secondary-foreground">
          <span className="font-medium underline">{searchParams.email}</span>로 인증 메일을 발송했습니다. <br />
          메일에 포함된 링크를 클릭하여 회원가입을 완료해주세요.
        </p>
      </div>
      <JoinConfirmForm {...searchParams} />
    </main>
  );
}
