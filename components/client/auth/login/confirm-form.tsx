'use client';

import { confirmLogin } from '@/apis/client/auth';
import { EmailFormField, OTPFormField } from '@/components/client/form-field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { loginConfirmSchema, loginConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { LogInIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof loginConfirmSchema>;

interface LoginConfirmSearchParams {
  defaultValues: z.infer<typeof loginConfirmSearchParamsSchema>;
}

export default function LoginConfirmForm({ defaultValues }: Readonly<LoginConfirmSearchParams>) {
  const { registerSession } = useAuth();
  const form = useForm<FormType>({ resolver: zodResolver(loginConfirmSchema), defaultValues });

  function onSubmit(values: FormType) {
    confirmLogin(values)
      .then(({ body, session }) => {
        toast.success(body.message);
        registerSession(session);
      })
      .catch((error) => handleFormError(error, form.setError));
  }

  useEffect(() => {
    if (defaultValues.otp) {
      form.handleSubmit(onSubmit)();
    }
  }, [defaultValues.otp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailFormField control={form.control} readOnly />
        <OTPFormField control={form.control} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <LogInIcon /> 인증번호 확인
        </Button>
      </form>
    </Form>
  );
}
