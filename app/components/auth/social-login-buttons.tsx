import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

interface SocialLoginButtonsProps {
  type: '로그인' | '회원가입';
}

export default function SocialLoginButtons({ type }: Readonly<SocialLoginButtonsProps>) {
  return (
    <>
      <div className="flex items-center gap-2">
        <hr className="flex-grow" />
        <p className="text-xs text-muted-foreground whitespace-nowrap">또는 소셜 계정으로</p>
        <hr className="flex-grow" />
      </div>
      <div className="flex flex-col gap-2">
        <Button variant={'outline'} asChild>
          <Link to={`${import.meta.env.VITE_API_HOST}/api/oauth2/authorize/google`}>
            <img src={'/icons/google.svg'} alt={'Google'} className="size-4" />
            구글 계정으로 {type}
          </Link>
        </Button>
        <Button variant={'outline'} asChild>
          <Link to={`${import.meta.env.VITE_API_HOST}/api/oauth2/authorize/github`}>
            <img src={'/icons/github.svg'} alt={'GitHub'} className="size-4 dark:invert" />
            깃허브 계정으로 {type}
          </Link>
        </Button>
      </div>
    </>
  );
}
