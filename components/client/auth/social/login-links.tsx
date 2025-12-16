import { TopicIcon } from '@/components/client/topic';
import { buildAPIUrl } from '@/lib/utils';
import { ButtonLink } from '@ui/button-link';

export default function SocialLoginLinks() {
  return (
    <>
      <div className="flex items-center gap-2">
        <hr className="flex-grow" />
        <p className="text-xs text-muted-foreground whitespace-nowrap">또는 소셜 계정으로</p>
        <hr className="flex-grow" />
      </div>
      <div className="flex flex-col gap-2">
        <ButtonLink variant={'outline'} href={buildAPIUrl('oauth2/authorize/google')}>
          <TopicIcon slug="google" name="Google" />
          구글로 로그인
        </ButtonLink>
        <ButtonLink variant={'outline'} href={buildAPIUrl('oauth2/authorize/github')}>
          <TopicIcon slug="github" name="GitHub" />
          깃허브로 로그인
        </ButtonLink>
      </div>
    </>
  );
}
