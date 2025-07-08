import { LogInIcon, UserPlusIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

export default function HomeAuthLinks() {
  return (
    <>
      <ButtonLink to={'/join'} variant="outline">
        <UserPlusIcon /> 회원가입
      </ButtonLink>
      <ButtonLink to={'/login'} variant={'secondary'}>
        <LogInIcon /> 로그인
      </ButtonLink>
    </>
  );
}
