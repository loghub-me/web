import { deleteSelfGitHub } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { UnplugIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function UserGitHubDeleteButton() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  function onClickDelete() {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    startTransition(async () => {
      try {
        const { message } = await deleteSelfGitHub();
        toast.success(message);

        await queryClient.invalidateQueries({ queryKey: ['getSelfGitHub'] });
      } catch (err) {
        handleError(err);
      }
    });
  }

  return (
    session && (
      <Button type={'button'} variant={'destructive'} size={'sm'} onClick={onClickDelete} disabled={isPending}>
        <UnplugIcon /> GitHub 연결 해제
      </Button>
    )
  );
}
