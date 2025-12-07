'use client';

import { updateSelfGitHub } from '@/apis/client/user';
import { UserGitHubVerifyButton } from '@/components/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { userGitHubUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { InputWithIcon } from '@ui/input';
import { AtSignIcon, UserPenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UserGitHubFormProps {
  github: UserGitHub;
}

export default function UserGitHubForm({ github }: Readonly<UserGitHubFormProps>) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof userGitHubUpdateSchema>>({
    resolver: zodResolver(userGitHubUpdateSchema),
    defaultValues: { username: github?.username || '' },
  });

  function onSubmit(values: z.infer<typeof userGitHubUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    updateSelfGitHub(values)
      .then(({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ['getSelfGitHub'] });
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={'username'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub 유저네임</FormLabel>
              <FormControl>
                <InputWithIcon icon={AtSignIcon} type={'text'} placeholder="GitHub 유저네임 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <UserGitHubVerifyButton isSubmitting={form.formState.isSubmitting} verified={github.verified} />
          <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
            <UserPenIcon /> GitHub 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
