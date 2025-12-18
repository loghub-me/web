'use client';

import { updateSelfPrivacy } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { userPrivacyUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@ui/form';
import { Switch, SwitchIcon } from '@ui/switch';
import { CheckIcon, GlobeIcon, GlobeLockIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UserPrivacyFormProps {
  privacy: UserPrivacy;
}

export default function UserPrivacyForm({ privacy }: Readonly<UserPrivacyFormProps>) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof userPrivacyUpdateSchema>>({
    resolver: zodResolver(userPrivacyUpdateSchema),
    defaultValues: privacy,
  });

  async function onSubmit(values: z.infer<typeof userPrivacyUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    try {
      const { message } = await updateSelfPrivacy(values);
      toast.success(message);

      await queryClient.invalidateQueries({ queryKey: ['getSelfPrivacy'] });
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name={'emailPublic'}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
              <div className="space-y-0.5">
                <FormLabel>이메일 주소 공개 여부</FormLabel>
                <FormDescription>다른 사용자에게 이메일 주소를 공개합니다.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange}>
                  <SwitchIcon enabledIcon={GlobeIcon} disabledIcon={GlobeLockIcon} value={field.value} />
                </Switch>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
            <CheckIcon /> 변경사항 저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
