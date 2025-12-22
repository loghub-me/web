'use client';

import { updateSelfGitHub } from '@/apis/client/user';
import { UserGitHubDeleteButton, UserGitHubVerifyButton } from '@/components/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { buildAssetsUrl } from '@/lib/utils';
import { userGitHubUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputWithIcon } from '@ui/input';
import { AtSignIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

  async function onSubmit(values: z.infer<typeof userGitHubUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    try {
      const { message } = await updateSelfGitHub(values);
      toast.success(message);

      await queryClient.invalidateQueries({ queryKey: ['getSelfGitHub'] });
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  useEffect(() => {
    form.reset({ username: github?.username || '' });
  }, [form, github]);

  return (
    <form id="github-update-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name={'username'}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="github-update-form-username">GitHub 유저네임</FieldLabel>
            <InputWithIcon
              {...field}
              id="username-update-form-username"
              aria-invalid={fieldState.invalid}
              icon={AtSignIcon}
              placeholder="GitHub 유저네임을 입력해주세요"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-wrap flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {github.username && (
          <>
            <UserGitHubDeleteButton />
            <UserGitHubVerifyButton github={github} />
          </>
        )}
        <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
          <Image src={buildAssetsUrl('icons/github-dark.svg')} alt={'GitHub'} width={16} height={16} /> GitHub 업데이트
        </Button>
      </div>
    </form>
  );
}
