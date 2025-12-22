'use client';

import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { LabelOptional } from '@ui/label';
import { MailIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface EmailFieldProps<T extends { email: string }> {
  id: string;
  control: Control<T>;
  readOnly?: boolean;
  optional?: boolean;
}

export default function EmailField<T extends { email: string }>({
  id,
  control,
  readOnly = false,
  optional = false,
}: EmailFieldProps<T>) {
  return (
    <Controller
      name={'email' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>E-mail {optional && <LabelOptional />}</FieldLabel>
          <InputWithIcon
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            readOnly={readOnly}
            icon={MailIcon}
            placeholder="foo@loghub.me"
            autoComplete="email"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
