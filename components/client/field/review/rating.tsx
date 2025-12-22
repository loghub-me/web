'use client';

import { Field, FieldError } from '@ui/field';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@ui/select';
import StarIcon from '@ui/star-icon';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface ReviewRatingFieldProps<T extends { rating: number }> {
  id: string;
  control: Control<T>;
}

export default function ReviewRatingField<T extends { rating: number }>({ id, control }: ReviewRatingFieldProps<T>) {
  return (
    <Controller
      name={'rating' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-32">
          <Select defaultValue={field.value.toString()} onValueChange={(value) => field.onChange(parseInt(value, 10))}>
            <SelectTrigger id={id} aria-invalid={fieldState.invalid} size={'sm'} className="rounded-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 4, 3, 2, 1].map((i) => (
                <SelectItem key={i} value={i.toString()} className="px-1.5">
                  <div className="flex gap-0.5">
                    <StarIcon size={i} fill={true} className="size-3.5" />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
