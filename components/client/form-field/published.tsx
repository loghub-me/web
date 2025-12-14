'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@ui/form';
import { Switch } from '@ui/switch';
import { SwitchIcon } from '@ui/switch';
import { GlobeIcon, GlobeLockIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';

interface PublishedFormFieldProps<T extends { published: boolean }> {
  control: Control<T>;
}

export default function PublishedFormField<T extends { published: boolean }>({ control }: PublishedFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'published' as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
          <div className="space-y-0.5">
            <FormLabel>공개 여부</FormLabel>
            <FormDescription>다른 사용자에게 포스트를 공개합니다.</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange}>
              <SwitchIcon enabledIcon={GlobeIcon} disabledIcon={GlobeLockIcon} value={field.value} />
            </Switch>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
