import type { Route } from './+types/request';
import { UserIcon } from 'lucide-react';
import { Link } from 'react-router';
import { JoinRequestForm, SocialLoginButtons } from '~/components/auth';
import { createMetadata } from '~/constants/meta';

export const meta: Route.MetaFunction = () => {
  const title = '회원가입';
  const description = '회원가입 페이지입니다. LogHub에 회원가입하여 더 많은 기능을 이용해보세요.';
  return createMetadata(title, description);
};

export default function JoinRequestRoute() {
  return (
    <main className="space-y-4 w-80">
      <div className="flex flex-col items-center gap-2 mb-6">
        <UserIcon className="p-2 size-10 bg-secondary rounded-full" />
        <h2 className="text-2xl font-bold">회원가입</h2>
        <p className="text-sm text-secondary-foreground">회원가입하시면 더 많은 기능을 이용하실 수 있습니다.</p>
      </div>
      <JoinRequestForm />
      <SocialLoginButtons type={'회원가입'} />
      <p className="text-center text-muted-foreground text-sm">
        계정이 이미 있으신가요?{' '}
        <Link to={'/login'} className="underline">
          로그인으로
        </Link>
      </p>
    </main>
  );
}
