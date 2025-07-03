import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { addBookStar, existsBookStar, removeBookStar } from '~/apis/client/books';
import { Button } from '~/components/ui/button';
import { ErrorMessage } from '~/constants/error-messages';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

interface BookStarButtonProps {
  bookId: number;
  starCount: number;
}

export default function BookStarButton({ bookId, starCount: defaultStarCount }: Readonly<BookStarButtonProps>) {
  const queryClient = useQueryClient();
  const { status } = useAuth();

  const { data: exists, isLoading: existsLoading } = useQuery({
    queryKey: ['existsBookStar', bookId],
    queryFn: () => existsBookStar(bookId).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
  const [starCount, setStarCount] = useState(defaultStarCount);
  const { mutate, isPending } = useMutation({
    mutationFn: (currentExists: boolean) => (currentExists ? removeBookStar(bookId) : addBookStar(bookId)),
    onMutate: async (currentExists: boolean) => {
      setStarCount((prev) => (currentExists ? prev - 1 : prev + 1));
      const prevExists = queryClient.getQueryData(['existsBookStar', bookId]);
      queryClient.setQueryData(['existsBookStar', bookId], !currentExists);
      return { prevExists };
    },
    onError: (_err, currentExists: boolean, context) => {
      setStarCount((prev) => (currentExists ? prev + 1 : prev - 1));
      queryClient.setQueryData(['existsBookStar', bookId], context?.prevExists);
      toast.error(ErrorMessage.UNKNOWN);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['existsBookStar', bookId] }),
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
      <StarIcon className={cn('text-yellow-500', exists && 'fill-current')} />
      <span className="font-mono text-xs">{starCount}</span>
    </Button>
  );
}
