'use client';

import { postSeriesReview } from '@/apis/client/series';
import { ReviewRatingField, ReviewContentField } from '@/components/client/field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { seriesReviewPostSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { ButtonLink } from '@ui/button-link';
import { FieldError } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '@ui/input-group';
import { Separator } from '@ui/separator';
import { MessageSquareIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
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
    <form id="series-review-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <InputGroup>
        <ReviewContentField id={'series-review-form-content'} control={form.control} />
        <InputGroupAddon align="block-end">
          <ReviewRatingField id={'series-review-form-rating'} control={form.control} />
          <Controller
            name={'content'}
            control={form.control}
            render={({ field }) => (
              <InputGroupText className="ml-auto">{field.value.length}/1024 자 입력</InputGroupText>
            )}
          />
          <Separator orientation="vertical" className="h-6 my-auto" />
          <Button type={'submit'} size={'icon-sm'} disabled={form.formState.isSubmitting}>
            <MessageSquareIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Controller
        name={'content'}
        control={form.control}
        render={({ fieldState }) => <FieldError errors={[fieldState.error]} />}
      />
    </form>
  );
}
