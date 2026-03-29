'use client';

import { followUser, existsFollow, unfollowUser } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { CheckIcon, UserPlusIcon } from 'lucide-react';
import { toast } from 'sonner';

interface UserFollowToggleProps {
  followeeId: number;
}

export default function UserFollowToggle({ followeeId }: Readonly<UserFollowToggleProps>) {
  const queryClient = useQueryClient();
  const { status, session } = useAuth();

  const queryKey = ['existsFollow', followeeId];
  const { data: exists, isLoading: existsLoading } = useQuery({
    queryKey,
    queryFn: () => existsFollow(followeeId).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (currentExists: boolean) => (currentExists ? unfollowUser(followeeId) : followUser(followeeId)),
    onMutate: async (currentExists: boolean) => {
      const prevExists = queryClient.getQueryData(['existsFollow', followeeId]);
      queryClient.setQueryData(queryKey, !currentExists);
      return { prevExists };
    },
    onError: (_err, currentExists: boolean, context) => {
      queryClient.setQueryData(queryKey, context?.prevExists);
      toast.error(ErrorMessage.UNKNOWN);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  function onButtonClick() {
    if (status === 'unauthenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    mutate(Boolean(exists));
  }

  if (session?.id === followeeId) return null;

  return (
    <Button variant="outline" className="w-full" onClick={onButtonClick} disabled={existsLoading || isPending}>
      <span className="relative size-4">
        <CheckIcon
          className={cn(
            'text-primary',
            'absolute top-0 left-0 transition-[rotate,opacity]',
            exists ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
          )}
        />
        <UserPlusIcon
          className={cn(
            'absolute top-0 left-0 transition-[rotate,opacity]',
            !exists ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
          )}
        />
      </span>
      <span>{exists ? '팔로잉' : '팔로우'}</span>
    </Button>
  );
}
