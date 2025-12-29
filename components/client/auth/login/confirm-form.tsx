'use client';

import { confirmLogin } from '@/apis/client/auth';
import { EmailField, OTPField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { loginConfirmSchema, loginConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { LogInIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface LoginConfirmSearchParams {
  defaultValues: z.infer<typeof loginConfirmSearchParamsSchema>;
}

export default function LoginConfirmForm({ defaultValues }: Readonly<LoginConfirmSearchParams>) {
  const form = useForm<z.infer<typeof loginConfirmSchema>>({
    resolver: zodResolver(loginConfirmSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof loginConfirmSchema>) {
    try {
      const { message } = await confirmLogin(values);
      toast.success(message);
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
        <LogInIcon /> 인증번호 확인
      </Button>
    </form>
  );
}
