import { zodResolver } from '@hookform/resolvers/zod';
import type { KyResponse } from 'ky';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { requestLogin } from '~/apis/client/auth';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { handleFormError } from '~/lib/error';
import { loginRequestSchema } from '~/schemas/auth';

export default function LoginRequestForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginRequestSchema>>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: z.infer<typeof loginRequestSchema>) {
    requestLogin(values)
      .then(async (res: KyResponse) => {
        const { message } = await res.json<MessageResponseBody>();
        if (!res.ok) {
          form.setError('root', { message: message });
          return;
        }
        toast.message(message, { icon: <MailIcon size="size-3" /> });
        navigate(`/login/confirm?email=${values.email}`);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="torvalds@example.org" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <MailIcon /> 이메일로 로그인
        </Button>
      </form>
    </Form>
  );
}
