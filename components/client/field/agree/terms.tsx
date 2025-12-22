'use client';

import { Badge } from '@ui/badge';
import { Checkbox } from '@ui/checkbox';
import { Field, FieldLabel } from '@ui/field';
import Link from 'next/link';
import { Control, Controller, Path } from 'react-hook-form';

interface AgreeTermsFieldProps<T extends { agreeTerms: boolean }> {
  id: string;
  control: Control<T>;
}

export default function AgreeTermsField<T extends { agreeTerms: boolean }>({ id, control }: AgreeTermsFieldProps<T>) {
  return (
    <Controller
      name={'agreeTerms' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation={'horizontal'} className="gap-2">
          <Checkbox id={id} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
          <FieldLabel htmlFor={id} className="font-normal">
            이용약관 동의
          </FieldLabel>
          <Badge variant={'outline'} className="px-1" render={<Link href={'/legal#terms'} className="text-primary" />}>
            보기
          </Badge>
        </Field>
      )}
    />
  );
}
