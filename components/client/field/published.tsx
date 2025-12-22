'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/field';
import { Switch, SwitchIcon } from '@ui/switch';
import { GlobeIcon, GlobeLockIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface PublishedFieldProps<T extends { published: boolean }> {
  id: string;
  control: Control<T>;
}

export default function PublishedField<T extends { published: boolean }>({ id, control }: PublishedFieldProps<T>) {
  return (
    <Controller
      name={'published' as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation={'horizontal'} className="px-3 py-2 border rounded-md">
          <div className="flex-1 space-y-0.5">
            <FieldLabel htmlFor={id}>공개 여부</FieldLabel>
            <FieldDescription>다른 사용자에게 포스트를 공개합니다.</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
          <Switch id={id} {...field} checked={field.value} onCheckedChange={field.onChange}>
            <SwitchIcon enabledIcon={GlobeIcon} disabledIcon={GlobeLockIcon} value={field.value} />
          </Switch>
        </Field>
      )}
    />
  );
}
