import { zodResolver } from '@hookform/resolvers/zod';
import { GlobeIcon, GlobeLockIcon, UploadIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateSelfPrivacy } from '~/apis/client/user';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Switch, SwitchIcon } from '~/components/ui/switch';
import { handleFormError } from '~/lib/error';
import { userPrivacyUpdateSchema } from '~/schemas/user';

interface UserPrivacyUpdateFormProps {
  privacy: UserPrivacy;
}

export default function UserPrivacyUpdateForm({ privacy }: Readonly<UserPrivacyUpdateFormProps>) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof userPrivacyUpdateSchema>>({
    resolver: zodResolver(userPrivacyUpdateSchema),
    defaultValues: privacy,
  });

  function onSubmit(values: z.infer<typeof userPrivacyUpdateSchema>) {
    updateSelfPrivacy(values)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emailVisible"
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
        <FormField
          control={form.control}
          name="starVisible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 space-y-0">
              <div className="space-y-0.5">
                <FormLabel>스타 공개 여부</FormLabel>
                <FormDescription>다른 사용자에게 스타를 공개합니다.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange}>
                  <SwitchIcon enabledIcon={GlobeIcon} disabledIcon={GlobeLockIcon} value={field.value} />
                </Switch>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type={'button'} variant={'ghost'} onClick={() => form.reset()}>
            초기화
          </Button>
          <Button type={'submit'}>
            <UploadIcon /> 저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
