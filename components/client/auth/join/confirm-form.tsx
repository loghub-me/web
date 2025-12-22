'use client';

import { confirmJoin } from '@/apis/client/auth';
import { EmailField, OTPField } from '@/components/client/field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { joinConfirmSchema, joinConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface JoinConfirmSearchParams {
  defaultValues: z.infer<typeof joinConfirmSearchParamsSchema>;
}

export default function JoinConfirmForm({ defaultValues }: Readonly<JoinConfirmSearchParams>) {
  const { registerSession } = useAuth();
  const form = useForm<z.infer<typeof joinConfirmSchema>>({ resolver: zodResolver(joinConfirmSchema), defaultValues });

  async function onSubmit(values: z.infer<typeof joinConfirmSchema>) {
    try {
      const { body, session } = await confirmJoin(values);
      toast.success(body.message);
      registerSession(session);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  useEffect(() => {
    if (defaultValues.otp) {
      form.handleSubmit(onSubmit)();
    }
  }, [defaultValues.otp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form id="login-confirm-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <EmailField id="login-confirm-form-email" control={form.control} readOnly />
      <OTPField id="login-confirm-form-otp" control={form.control} />
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        <UserPlusIcon /> 인증번호 확인
      </Button>
    </form>
  );
}
