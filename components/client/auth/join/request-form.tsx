'use client';

import { requestJoin } from '@/apis/client/auth';
import { AgreePrivacyFormField, AgreeTermsFormField, EmailFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { joinRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof joinRequestSchema>;

export default function JoinRequestForm() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: { email: '', username: '', nickname: '', agreeTerms: false, agreePrivacy: false },
  });

  async function onSubmit(values: FormType) {
    try {
      const { message } = await requestJoin(values);
      toast.success(message);
      router.push(`/join/confirm?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailFormField control={form.control} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>유저네임</FormLabel>
              <FormControl>
                <Input placeholder="foo" {...field} />
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
                <Input placeholder="bar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <AgreeTermsFormField control={form.control} />
          <AgreePrivacyFormField control={form.control} />
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <UserPlusIcon /> 회원가입
        </Button>
      </form>
    </Form>
  );
}
