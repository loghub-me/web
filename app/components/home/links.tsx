import { LogInIcon, UserPlusIcon } from 'lucide-react';
import { ButtonLink } from '~/components/ui/button';

export default function HomeLinks() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <ButtonLink to={'/join'} variant="outline">
          <UserPlusIcon /> 회원가입
        </ButtonLink>
        <ButtonLink to={'/login'} variant={'secondary'} className={'border'}>
          <LogInIcon /> 로그인
        </ButtonLink>
      </div>
      <div className="flex justify-center gap-2">
        <ButtonLink to={'https://github.com/loghub-kr/loghub-kr'} target={'_blank'} variant="ghost" size={'icon'}>
          <img className="size-4 dark:invert" src={'/icons/github.svg'} alt={'GitHub'} />
        </ButtonLink>
      </div>
    </div>
  );
}
