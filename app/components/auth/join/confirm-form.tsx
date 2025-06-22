import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { confirmJoin } from '~/apis/client/auth';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '~/components/ui/input-otp';
import { useAuth } from '~/hooks/use-auth';
import { handleFormError } from '~/lib/error';
import { joinConfirmSchema } from '~/schemas/auth';

interface JoinConfirmFormProps {
  email: string;
}

export default function JoinConfirmForm({ email }: Readonly<JoinConfirmFormProps>) {
  const form = useForm<z.infer<typeof joinConfirmSchema>>({
    resolver: zodResolver(joinConfirmSchema),
    defaultValues: { email: email, otp: '' },
  });
  const { registerSession } = useAuth();
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof joinConfirmSchema>) {
    confirmJoin(values)
      .then((session) => {
        registerSession(session);
        toast.success('회원가입이 성공적으로 완료되었습니다!');
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
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <MailIcon /> 이메일로 회원가입
        </Button>
      </form>
    </Form>
  );
}
