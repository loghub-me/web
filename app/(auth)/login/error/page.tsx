import Symbol from '@/components/global/symbol';
import { ErrorMessage } from '@/constants/messages';
import { parseObject } from '@/lib/parse';
import { loginErrorSearchParamsSchema } from '@/schemas/auth';
import { ButtonLink } from '@ui/button-link';
import { LogInIcon } from 'lucide-react';

export default async function LoginErrorPage({ searchParams }: PageProps<'/login/error'>) {
  const parsedSearchParams = parseObject(await searchParams, loginErrorSearchParamsSchema);
  const { error } = parsedSearchParams;
  const errorMessage =
    error === 'social_provider_mismatch' ? ErrorMessage.SOCIAL_PROVIDER_MISMATCH : ErrorMessage.UNKNOWN;

  return (
    <section className="flex-1 p-4 pb-8 flex items-center justify-center">
      <div className="max-w-70 w-full space-y-4">
        <Symbol size={36} className="mx-auto" />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">로그인 에러</h2>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </div>
        <div className="flex justify-center gap-2">
          <ButtonLink href={'/login'} variant={'outline'}>
            <LogInIcon /> 로그인 페이지로
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
