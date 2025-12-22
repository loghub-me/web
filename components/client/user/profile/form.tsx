'use client';

import { updateSelfProfile } from '@/apis/client/user';
import { NicknameField } from '@/components/client/field';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { userProfileUpdateSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupAutoHeightTextarea, InputGroupText } from '@ui/input-group';
import { UserPenIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface UserProfileFormProps {
  profile: UserProfile;
}

export default function UserProfileForm({ profile }: Readonly<UserProfileFormProps>) {
  const { session, registerSession } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof userProfileUpdateSchema>>({
    resolver: zodResolver(userProfileUpdateSchema),
    defaultValues: profile,
  });

  async function onSubmit(values: z.infer<typeof userProfileUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    try {
      const { message } = await updateSelfProfile(values);
      toast.success(message);

      registerSession({ ...session, nickname: values.nickname });
      await queryClient.invalidateQueries({ queryKey: ['getSelfProfile'] });
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="profile-update-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <NicknameField id="profile-update-form-nickname" control={form.control} />
      <Controller
        name={'readme'}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="profile-update-form-readme">README</FieldLabel>
            <InputGroup>
              <InputGroupAutoHeightTextarea
                {...field}
                id="profile-update-form-readme"
                placeholder="자기소개를 입력해주세요."
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="ml-auto">{field.value?.length || 0}/1024 자 입력</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type={'submit'} size={'sm'} disabled={form.formState.isSubmitting}>
          <UserPenIcon /> 프로필 업데이트
        </Button>
      </div>
    </form>
  );
}
