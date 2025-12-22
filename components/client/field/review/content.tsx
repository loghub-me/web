'use client';

import { Field } from '@ui/field';
import { InputGroupAutoHeightTextarea } from '@ui/input-group';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface ReviewContentFieldProps<T extends { content: string }> {
  id: string;
  control: Control<T>;
}

export default function ReviewContentField<T extends { content: string }>({ id, control }: ReviewContentFieldProps<T>) {
  return (
    <Controller
      name={'content' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputGroupAutoHeightTextarea
            {...field}
            id={id}
            placeholder={'리뷰를 작성해주세요!'}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
