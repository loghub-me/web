'use client';

import { postSeriesReview } from '@/apis/client/series';
import { RatingFormField } from '@/components/client/form-field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { seriesReviewPostSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AutoHeightTextarea } from '@ui/auto-height-textarea';
import { Button } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { MessageSquareIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SeriesReviewFormProps {
  seriesId: number;
  queryKey: (string | number)[];
}

export default function SeriesReviewForm({ seriesId, queryKey }: Readonly<SeriesReviewFormProps>) {
  const form = useForm<z.infer<typeof seriesReviewPostSchema>>({
    resolver: zodResolver(seriesReviewPostSchema),
    defaultValues: { content: '', rating: 5 },
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof seriesReviewPostSchema>) {
    try {
      const { message } = await postSeriesReview(seriesId, values);
      toast.success(message);
      form.reset();

      await queryClient.invalidateQueries({ queryKey });
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  if (!session) {
    return (
      <p className="py-2 text-sm text-center text-muted-foreground">
        <ButtonLink href={'/login'} variant={'link'} className="p-0 h-fit">
          로그인
        </ButtonLink>{' '}
        후 댓글을 작성할 수 있습니다.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <RatingFormField control={form.control} />
          <Button type="submit" size={'sm'} disabled={form.formState.isSubmitting}>
            <MessageSquareIcon /> 리뷰 등록
          </Button>
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoHeightTextarea placeholder="리뷰를 작성해주세요!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
