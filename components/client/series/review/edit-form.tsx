import { editSeriesReview } from '@/apis/client/series';
import { RatingFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { seriesReviewEditSchema } from '@/schemas/series';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Textarea } from '@ui/textarea';
import { PencilIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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

  function onSubmit(values: z.infer<typeof seriesReviewEditSchema>) {
    editSeriesReview(seriesId, review.id, values)
      .then(async ({ message }) => {
        toast.success(message);
        form.reset();

        queryClient.invalidateQueries({ queryKey }).then(closeForm);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-0.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <RatingFormField control={form.control} />
          <Button type="submit" size={'sm'} disabled={form.formState.isSubmitting}>
            <PencilIcon /> 리뷰 수정
          </Button>
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="리뷰를 작성해주세요!" className="h-24" {...field} autoHeight={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
