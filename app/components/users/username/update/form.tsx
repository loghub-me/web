import { zodResolver } from '@hookform/resolvers/zod';
import { UserRoundPenIcon, XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { refreshToken } from '~/apis/client/auth';
import { updateSelfUsername } from '~/apis/client/users';
import { Button } from '~/components/ui/button';
import { DialogClose } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/hooks/use-auth';
import { handleFormError } from '~/lib/error';
import { usernameUpdateSchema } from '~/schemas/user';

export default function UsernameUpdateForm() {
  const { session, registerSession, unregisterSession } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof usernameUpdateSchema>>({
    resolver: zodResolver(usernameUpdateSchema),
    defaultValues: { oldUsername: '', newUsername: '' },
  });

  function onSubmit(values: z.infer<typeof usernameUpdateSchema>) {
    if (values.oldUsername !== session?.username) {
      form.setError('oldUsername', { message: '현재 유저네임이 올바르지 않습니다.' });
      return;
    }

    updateSelfUsername(values)
      .then(({ message }) => {
        toast.success(message);
        navigate(0);
        refreshToken().then(registerSession).catch(unregisterSession);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>현재 유저네임</FormLabel>
              <FormControl>
                <Input placeholder={session?.username} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 유저네임</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 닫기
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <UserRoundPenIcon /> 변경
          </Button>
        </div>
      </form>
    </Form>
  );
}
