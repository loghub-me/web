'use client';

import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@ui/input-otp';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface OTPFieldProps<T extends { email: string }> {
  id: string;
  control: Control<T>;
}

export default function OTPField<T extends { email: string }>({ id, control }: OTPFieldProps<T>) {
  return (
    <Controller
      name={'otp' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>인증번호</FieldLabel>

          <InputOTP {...field} id={id} aria-invalid={fieldState.invalid} maxLength={6} className="justify-between">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
