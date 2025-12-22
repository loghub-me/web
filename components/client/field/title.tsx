'use client';

import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { LetterTextIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface TitleFieldProps<T extends { title: string }> {
  id: string;
  control: Control<T>;
}

export default function TitleField<T extends { title: string }>({ id, control }: TitleFieldProps<T>) {
  return (
    <Controller
      name={'title' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>제목</FieldLabel>
          <InputWithIcon
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            icon={LetterTextIcon}
            placeholder="제목을 입력해주세요"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
