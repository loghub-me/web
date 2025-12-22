import { editSeriesReview } from '@/apis/client/series';
import { ReviewRatingField, ReviewContentField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { seriesReviewEditSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { FieldError } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '@ui/input-group';
import { Separator } from '@ui/separator';
import { PencilIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface SeriesReviewEditFormProps {
  seriesId: number;
  review: SeriesReview;
  queryKey: (string | number)[];
  closeForm: () => void;
}

export default function SeriesReviewEditForm({
  seriesId,
  review,
  queryKey,
  closeForm,
}: Readonly<SeriesReviewEditFormProps>) {
  const form = useForm<z.infer<typeof seriesReviewEditSchema>>({
    resolver: zodResolver(seriesReviewEditSchema),
    defaultValues: review,
  });
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof seriesReviewEditSchema>) {
    try {
      const { message } = await editSeriesReview(seriesId, review.id, values);
      toast.success(message);
      form.reset();

      await queryClient.invalidateQueries({ queryKey }).then(closeForm);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="series-review-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-0.5 space-y-2">
      <InputGroup>
        <ReviewContentField id={'series-review-edit-form-content'} control={form.control} />
        <InputGroupAddon align="block-end">
          <ReviewRatingField id={'series-review-edit-form-rating'} control={form.control} />
          <Controller
            name={'content'}
            control={form.control}
            render={({ field }) => (
              <InputGroupText className="ml-auto">{field.value.length}/1024 자 입력</InputGroupText>
            )}
          />
          <Separator orientation="vertical" className="h-6 my-auto" />
          <Button type={'submit'} size={'icon-sm'} disabled={form.formState.isSubmitting}>
            <PencilIcon />
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
