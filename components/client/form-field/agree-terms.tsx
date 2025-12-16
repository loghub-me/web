'use client';

import { Badge } from '@ui/badge';
import { Checkbox } from '@ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@ui/form';
import Link from 'next/link';
import { Control, Path } from 'react-hook-form';

interface AgreeTermsFormFieldProps<T extends { agreeTerms: boolean }> {
  control: Control<T>;
}

export default function AgreeTermsFormField<T extends { agreeTerms: boolean }>({
  control,
}: AgreeTermsFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'agreeTerms' as Path<T>}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>이용약관 동의</FormLabel>
          <Badge variant={'outline'} className="px-1" render={<Link href={'/legal#terms'} className="text-primary" />}>
            보기
          </Badge>
        </FormItem>
      )}
    />
  );
}
