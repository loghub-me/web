'use client';

import { requestLogin } from '@/apis/client/auth';
import { EmailFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { loginRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof loginRequestSchema>;

export default function LoginRequestForm() {
  const router = useRouter();
  const form = useForm<FormType>({ resolver: zodResolver(loginRequestSchema), defaultValues: { email: '' } });

  async function onSubmit(values: FormType) {
    try {
      const { message } = await requestLogin(values);
      toast.success(message);
      router.push(`/login/confirm?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailFormField control={form.control} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <LogInIcon /> 로그인
        </Button>
      </form>
    </Form>
  );
}
