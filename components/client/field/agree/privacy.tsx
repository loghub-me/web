'use client';

import { Badge } from '@ui/badge';
import { Checkbox } from '@ui/checkbox';
import { Field, FieldLabel } from '@ui/field';
import Link from 'next/link';
import { Control, Controller, Path } from 'react-hook-form';

interface AgreePrivacyFieldProps<T extends { agreePrivacy: boolean }> {
  id: string;
  control: Control<T>;
}

export default function AgreePrivacyField<T extends { agreePrivacy: boolean }>({
  id,
  control,
}: AgreePrivacyFieldProps<T>) {
  return (
    <Controller
      name={'agreePrivacy' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation={'horizontal'} className="gap-2">
          <Checkbox id={id} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
          <FieldLabel htmlFor={id} className="font-normal">
            개인정보 처리방침 동의
          </FieldLabel>
          <Badge
            variant={'outline'}
            className="px-1"
            render={<Link href={'/legal#privacy'} className="text-primary" />}
          >
            보기
          </Badge>
        </Field>
      )}
    />
  );
}
