'use client';

import { confirmOAuth2Join } from '@/apis/client/auth';
import { AgreeTermsFormField, AgreePrivacyFormField, EmailFormField } from '@/components/client/form-field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { oauth2JoinConfirmSchema, oauth2JoinConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { UserPlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof oauth2JoinConfirmSchema>;

interface SocialJoinConfirmSearchParams {
  defaultValues: z.infer<typeof oauth2JoinConfirmSearchParamsSchema>;
}

export default function SocialJoinConfirmForm({ defaultValues }: Readonly<SocialJoinConfirmSearchParams>) {
  const { registerSession } = useAuth();
  const form = useForm<FormType>({
    resolver: zodResolver(oauth2JoinConfirmSchema),
    defaultValues: {
      ...defaultValues,
      username: '',
      nickname: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  });

  async function onSubmit(values: FormType) {
    try {
      const { body, session } = await confirmOAuth2Join(values);
      toast.success(body.message);
      registerSession(session);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailFormField control={form.control} readOnly />
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
          <UserPlusIcon /> 가입 완료
        </Button>
      </form>
    </Form>
  );
}
