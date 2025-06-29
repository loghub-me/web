import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { addArticleStar, existsArticleStar, removeArticleStar } from '~/apis/client/articles';
import { Button } from '~/components/ui/button';
import { ErrorMessage } from '~/constants/error-messages';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

interface ArticleStarButtonProps {
  articleId: number;
  starCount: number;
}

export default function ArticleStarButton({
  articleId,
  starCount: defaultStarCount,
}: Readonly<ArticleStarButtonProps>) {
  const queryClient = useQueryClient();
  const { status } = useAuth();

  const { data: exists, isLoading: existsLoading } = useQuery({
    queryKey: ['existsArticleStar', articleId],
    queryFn: () => existsArticleStar(articleId).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
  const [starCount, setStarCount] = useState(defaultStarCount);
  const { mutate, isPending } = useMutation({
    mutationFn: (currentExists: boolean) => (currentExists ? removeArticleStar(articleId) : addArticleStar(articleId)),
    onMutate: async (currentExists: boolean) => {
      setStarCount((prev) => (currentExists ? prev - 1 : prev + 1));
      const prevExists = queryClient.getQueryData(['existsArticleStar', articleId]);
      queryClient.setQueryData(['existsArticleStar', articleId], !currentExists);
      return { prevExists };
    },
    onError: (_err, currentExists: boolean, context) => {
      setStarCount((prev) => (currentExists ? prev + 1 : prev - 1));
      queryClient.setQueryData(['existsArticleStar', articleId], context?.prevExists);
      toast.error(ErrorMessage.UNKNOWN);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['existsArticleStar', articleId] }),
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
      <StarIcon className={cn('text-yellow-500', exists && 'fill-yellow-500')} />
      <span className="font-mono text-xs">{starCount}</span>
    </Button>
  );
}
