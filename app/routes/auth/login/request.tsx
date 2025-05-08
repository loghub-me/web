import { UserIcon } from 'lucide-react';
import { Link } from 'react-router';
import { LoginRequestForm, SocialLoginButtons } from '~/components/auth';

export default function LoginRequestRoute() {
  return (
    <main className="space-y-4 w-80">
      <div className="flex flex-col items-center gap-2 mb-6">
        <UserIcon className="p-2 size-10 bg-secondary rounded-full" />
        <h2 className="text-2xl font-bold">로그인</h2>
        <p className="text-sm text-secondary-foreground">로그인하시면 더 많은 기능을 이용하실 수 있습니다.</p>
      </div>
      <LoginRequestForm />
      <SocialLoginButtons type={'로그인'} />
      <p className="text-center text-muted-foreground text-sm">
        계정이 없으신가요?{' '}
        <Link to={'/join'} className="underline">
          회원가입으로
        </Link>
      </p>
    </main>
  );
}
