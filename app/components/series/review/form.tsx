import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { MessageSquareMoreIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { postSeriesReview } from '~/apis/client/series';
import StarIcon from '~/components/common/icon/star';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { UserLink } from '~/components/user';
import { useAuth } from '~/hooks/use-auth';
import { handleMessageError } from '~/lib/error';
import { seriesReviewPostSchema } from '~/schemas/series';

interface SeriesReviewFormProps {
  seriesId: number;
  queryKey: (string | number)[];
}

export default function SeriesReviewForm({ seriesId, queryKey }: Readonly<SeriesReviewFormProps>) {
  const form = useForm<z.infer<typeof seriesReviewPostSchema>>({
    resolver: zodResolver(seriesReviewPostSchema),
    defaultValues: { content: '', rating: 5, seriesId: seriesId },
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof seriesReviewPostSchema>) {
    postSeriesReview(seriesId, values)
      .then(({ message }) => {
        toast.success(message);

        form.reset();

        queryClient.invalidateQueries({ queryKey });
      })
      .catch(handleMessageError);
  }

  if (!session) {
    return (
      <p className="text-sm text-center text-muted-foreground">
        <Link to={'/login'} className="text-primary underline hover:text-primary/80">
          로그인
        </Link>{' '}
        후 리뷰를 작성할 수 있습니다.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <UserLink username={session.username} />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="평점을 선택해주세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((i) => (
                      <SelectItem key={i} value={i.toString()}>
                        <div className="flex gap-0.5">
                          <StarIcon size={i} fill={true} />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="text-card-foreground bg-card" placeholder="리뷰를 작성해주세요!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <MessageSquareMoreIcon /> 작성
        </Button>
      </form>
    </Form>
  );
}
