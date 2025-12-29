'use client';

import { updateSelfUsername } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { usernameUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { AtSignIcon, IdCardIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UsernameFormProps {
  username: string;
}

export default function UsernameForm({ username }: Readonly<UsernameFormProps>) {
  const { session, updateSession } = useAuth();
  const form = useForm<z.infer<typeof usernameUpdateSchema>>({
    resolver: zodResolver(usernameUpdateSchema),
    defaultValues: { oldUsername: '', newUsername: '' },
  });

  async function onSubmit(values: z.infer<typeof usernameUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    if (values.oldUsername !== username) {
      form.setError('oldUsername', { message: '현재 유저네임이 일치하지 않습니다.' });
      return;
    }

    try {
      const { message } = await updateSelfUsername(values);
      toast.success(message);
      form.reset();

      updateSession({ ...session, username: values.newUsername });
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="username-update-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name={'oldUsername'}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username-update-form-old-username">이전 유저네임</FieldLabel>
            <InputWithIcon
              {...field}
              id="username-update-form-old-username"
              aria-invalid={fieldState.invalid}
              icon={AtSignIcon}
              placeholder={`이전 유저네임을 입력해주세요: ${username}`}
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name={'newUsername'}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username-update-form-new-username">새 유저네임</FieldLabel>
            <InputWithIcon
              {...field}
              id="username-update-form-new-username"
              aria-invalid={fieldState.invalid}
              icon={AtSignIcon}
              placeholder="새로 사용하실 유저네임을 입력해주세요"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
          <IdCardIcon /> 유저네임 업데이트
        </Button>
      </div>
    </form>
  );
}
