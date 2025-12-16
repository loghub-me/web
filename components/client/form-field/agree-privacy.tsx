'use client';

import { Badge } from '@ui/badge';
import { Checkbox } from '@ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@ui/form';
import Link from 'next/link';
import { Control, Path } from 'react-hook-form';

interface AgreePrivacyFormFieldProps<T extends { agreePrivacy: boolean }> {
  control: Control<T>;
}

export default function AgreePrivacyFormField<T extends { agreePrivacy: boolean }>({
  control,
}: AgreePrivacyFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'agreePrivacy' as Path<T>}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>개인정보 처리방침 동의</FormLabel>
          <Badge
            variant={'outline'}
            className="px-1"
            render={<Link href={'/legal#privacy'} className="text-primary" />}
          >
            보기
          </Badge>
        </FormItem>
      )}
    />
  );
}
