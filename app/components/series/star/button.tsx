import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { addSeriesStar, existsSeriesStar, removeSeriesStar } from '~/apis/client/series';
import StarIcon from '~/components/common/icon/star';
import { Button } from '~/components/ui/button';
import { ErrorMessage } from '~/constants/error-messages';
import { useAuth } from '~/hooks/use-auth';

interface SeriesStarButtonProps {
  seriesId: number;
  starCount: number;
}

export default function SeriesStarButton({ seriesId, starCount: defaultStarCount }: Readonly<SeriesStarButtonProps>) {
  const queryClient = useQueryClient();
  const { status } = useAuth();

  const { data: exists, isLoading: existsLoading } = useQuery({
    queryKey: ['existsSeriesStar', seriesId],
    queryFn: () => existsSeriesStar(seriesId).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
  const [starCount, setStarCount] = useState(defaultStarCount);
  const { mutate, isPending } = useMutation({
    mutationFn: (currentExists: boolean) => (currentExists ? removeSeriesStar(seriesId) : addSeriesStar(seriesId)),
    onMutate: async (currentExists: boolean) => {
      setStarCount((prev) => (currentExists ? prev - 1 : prev + 1));
      const prevExists = queryClient.getQueryData(['existsSeriesStar', seriesId]);
      queryClient.setQueryData(['existsSeriesStar', seriesId], !currentExists);
      return { prevExists };
    },
    onError: (_err, currentExists: boolean, context) => {
      setStarCount((prev) => (currentExists ? prev + 1 : prev - 1));
      queryClient.setQueryData(['existsSeriesStar', seriesId], context?.prevExists);
      toast.error(ErrorMessage.UNKNOWN);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['existsSeriesStar', seriesId] }),
  });

  function onButtonClick() {
    if (status === 'unauthenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    mutate(Boolean(exists));
  }

  return (
    <Button
      variant="outline"
      className="px-2.5 bg-card rounded-full"
      onClick={onButtonClick}
      disabled={existsLoading || isPending}
    >
      <StarIcon fill={exists} />
      <span className="font-mono text-xs">{starCount}</span>
    </Button>
  );
}
