'use client';

import { confirmOAuth2Join } from '@/apis/client/auth';
import {
  AgreePrivacyField,
  AgreeTermsField,
  EmailField,
  NicknameField,
  UsernameField,
} from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { oauth2JoinConfirmSchema, oauth2JoinConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SocialJoinConfirmSearchParams {
  defaultValues: z.infer<typeof oauth2JoinConfirmSearchParamsSchema>;
}

export default function SocialJoinConfirmForm({ defaultValues }: Readonly<SocialJoinConfirmSearchParams>) {
  const form = useForm<z.infer<typeof oauth2JoinConfirmSchema>>({
    resolver: zodResolver(oauth2JoinConfirmSchema),
    defaultValues: {
      ...defaultValues,
      username: '',
      nickname: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof oauth2JoinConfirmSchema>) {
    try {
      const { message } = await confirmOAuth2Join(values);
      toast.success(message);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="social-join-confirm-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <EmailField id="social-join-confirm-form-email" control={form.control} readOnly />
      <UsernameField id="social-join-confirm-form-username" control={form.control} />
      <NicknameField id="social-join-confirm-form-nickname" control={form.control} />
      <div className="space-y-2">
        <AgreeTermsField id="social-join-request-form-agree-terms" control={form.control} />
        <AgreePrivacyField id="social-join-request-form-agree-privacy" control={form.control} />
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        <UserPlusIcon /> 가입 완료
      </Button>
    </form>
  );
}
