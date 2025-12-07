'use client';

import { updateSelfUsername } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { usernameUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { IdCardIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UsernameFormProps {
  username: string;
}

export default function UsernameForm({ username }: Readonly<UsernameFormProps>) {
  const { session, registerSession } = useAuth();
  const form = useForm<z.infer<typeof usernameUpdateSchema>>({
    resolver: zodResolver(usernameUpdateSchema),
    defaultValues: { oldUsername: '', newUsername: '' },
  });

  function onSubmit(values: z.infer<typeof usernameUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    if (values.oldUsername !== username) {
      form.setError('oldUsername', { message: '현재 유저네임이 일치하지 않습니다.' });
      return;
    }

    updateSelfUsername(values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
        registerSession({ ...session, username: values.newUsername });
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={'oldUsername'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이전 유저네임</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder={`이전 유저네임을 입력해주세요: ${username}`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'newUsername'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 유저네임</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder="새로 사용하실 유저네임을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
            <IdCardIcon /> 유저네임 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
