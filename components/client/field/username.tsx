'use client';

import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { AtSignIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface UsernameFieldProps<T extends { username: string }> {
  id: string;
  control: Control<T>;
}

export default function UsernameField<T extends { username: string }>({ id, control }: UsernameFieldProps<T>) {
  return (
    <Controller
      name={'username' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>유저네임</FieldLabel>
          <InputWithIcon
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            icon={AtSignIcon}
            placeholder="유저네임을 입력해주세요"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
