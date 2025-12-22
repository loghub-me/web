'use client';

import { requestLogin } from '@/apis/client/auth';
import { EmailField } from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { loginRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function LoginRequestForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginRequestSchema>>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof loginRequestSchema>) {
    try {
      const { message } = await requestLogin(values);
      toast.success(message);
      router.push(`/login/confirm?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="login-request-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <EmailField id="login-request-form-email" control={form.control} />
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        <LogInIcon /> 로그인
      </Button>
    </form>
  );
}
