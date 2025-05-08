import { zodResolver } from '@hookform/resolvers/zod';
import type { KyResponse } from 'ky';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { requestJoin } from '~/apis/client/auth';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { handleFormError } from '~/lib/error';
import { joinRequestSchema } from '~/schemas/auth';

export default function JoinRequestForm() {
  const form = useForm<z.infer<typeof joinRequestSchema>>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: { email: '', username: '', nickname: '' },
  });
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof joinRequestSchema>) {
    requestJoin(values)
      .then(async (res: KyResponse) => {
        const { message } = await res.json<MessageResponseBody>();
        if (!res.ok) {
          form.setError('root', { message: message });
          return;
        }
        toast.message(message, { icon: <MailIcon size="size-3" /> });
        navigate(`/join/confirm?email=${values.email}`);
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>유저명</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="nickname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          <MailIcon /> 이메일로 회원가입
        </Button>
      </form>
    </Form>
  );
}
