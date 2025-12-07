import { deleteSelfGitHub } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { UnplugIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UserGitHubDeleteButton() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onClickDelete() {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    setIsSubmitting(true);
    deleteSelfGitHub()
      .then(({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['getSelfGitHub'] });
      })
      .catch(handleError)
      .finally(() => setIsSubmitting(false));
  }

  return (
    session && (
      <Button type={'button'} variant={'destructive'} size={'sm'} disabled={isSubmitting} onClick={onClickDelete}>
        <UnplugIcon /> GitHub 연결 해제
      </Button>
    )
  );
}
