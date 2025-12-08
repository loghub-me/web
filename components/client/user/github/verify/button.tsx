import { verifySelfGitHub } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { buildWebUrl } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button, ButtonLink } from '@ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@ui/dialog';
import { DialogHeader, DialogFooter, DialogCloseButton } from '@ui/dialog';
import { BadgeCheckIcon, ClipboardCopyIcon, CopyIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UserGitHubVerifyButtonProps {
  github: Pick<UserGitHub, 'verified'>;
}

export default function UserGitHubVerifyButton({ github: { verified } }: Readonly<UserGitHubVerifyButtonProps>) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClickVerify() {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    setIsSubmitting(true);
    verifySelfGitHub()
      .then(({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['getSelfGitHub'] });
        setOpen(false);
      })
      .catch(handleError)
      .finally(() => setIsSubmitting(false));
  }

  return (
    session && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type={'button'} size={'sm'} variant={'outline'} disabled={verified}>
            <BadgeCheckIcon /> {verified ? '인증 완료' : 'GitHub 인증하기'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GitHub 계정 인증하기</DialogTitle>
            <DialogDescription>안내에 따라 GitHub 계정 설정을 완료한 후 인증을 시도해주세요.</DialogDescription>
          </DialogHeader>
          <div className="text-sm space-y-4">
            <ol className="pl-4 list-decimal marker:text-primary">
              <li>
                GitHub에 로그인한 후,
                <ButtonLink
                  href={'https://github.com/settings/profile'}
                  target={'_blank'}
                  variant={'link'}
                  size={'sm'}
                  className="has-[>svg]:px-1 h-auto gap-1"
                >
                  Public Profile 설정 페이지 <SquareArrowOutUpRightIcon className="size-3" />
                </ButtonLink>
                에 접속해주세요.
              </li>
              <li>
                <strong>URL</strong> 또는 <strong>Social accounts</strong> 필드에{' '}
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(buildWebUrl(session.username));
                    toast.success('프로필 링크가 클립보드에 복사되었습니다.', {
                      icon: <ClipboardCopyIcon className="size-4" />,
                    });
                  }}
                  variant={'link'}
                  size={'sm'}
                  className="has-[>svg]:px-1 h-auto gap-1"
                >
                  프로필 링크 <CopyIcon className="size-3" />
                </Button>
                를 추가해주세요.
              </li>
              <li>
                설정이 완료되었으면, 하단의 <strong>인증하기</strong> 버튼을 눌러 인증을 완료해주세요.
              </li>
            </ol>
            <blockquote className="border-l-primary bg-accent border-l-4 p-2 pl-4">
              <p>인증 완료 후, GitHub Public Profile 설정에서 추가한 링크를 제거해도 인증 상태는 유지됩니다.</p>
            </blockquote>
          </div>
          <DialogFooter>
            <DialogCloseButton>취소하기</DialogCloseButton>
            <Button type={'button'} size={'sm'} disabled={isSubmitting} onClick={onClickVerify}>
              <BadgeCheckIcon /> 인증하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
