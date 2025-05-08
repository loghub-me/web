import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { confirmLogin } from '~/apis/client/auth';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '~/components/ui/input-otp';
import { useAuth } from '~/hooks/use-auth';
import { handleFormError } from '~/lib/error';
import { loginConfirmSchema } from '~/schemas/auth';

interface LoginConfirmFormProps {
  email: string;
}

export default function LoginConfirmForm({ email }: Readonly<LoginConfirmFormProps>) {
  const form = useForm<z.infer<typeof loginConfirmSchema>>({
    resolver: zodResolver(loginConfirmSchema),
    defaultValues: { email: email, otp: '' },
  });
  const { registerSession } = useAuth();
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof loginConfirmSchema>) {
    confirmLogin(values)
      .then((session: Session) => {
        registerSession(session);
        toast.success('로그인이 성공적으로 완료되었습니다!');
        navigate('/');
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
                <Input placeholder="torvalds@example.org" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인증코드</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <MailIcon /> 이메일로 로그인
        </Button>
      </form>
    </Form>
  );
}
