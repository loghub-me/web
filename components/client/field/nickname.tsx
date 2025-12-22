'use client';

import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { ContactIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface NicknameFieldProps<T extends { nickname: string }> {
  id: string;
  control: Control<T>;
}

export default function NicknameField<T extends { nickname: string }>({ id, control }: NicknameFieldProps<T>) {
  return (
    <Controller
      name={'nickname' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>닉네임</FieldLabel>
          <InputWithIcon
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            icon={ContactIcon}
            placeholder="닉네임을 입력해주세요"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
