'use client';

import { requestJoin } from '@/apis/client/auth';
import {
  AgreePrivacyField,
  AgreeTermsField,
  EmailField,
  NicknameField,
  UsernameField,
} from '@/components/client/field';
import { handleFormError } from '@/lib/error';
import { joinRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function JoinRequestForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof joinRequestSchema>>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: { email: '', username: '', nickname: '', agreeTerms: false, agreePrivacy: false },
  });

  async function onSubmit(values: z.infer<typeof joinRequestSchema>) {
    try {
      const { message } = await requestJoin(values);
      toast.success(message);
      router.push(`/join/confirm?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      handleFormError(err, form.setError);
    }
  }

  return (
    <form id="join-request-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <EmailField id="join-request-form-email" control={form.control} />
      <UsernameField id="join-request-form-username" control={form.control} />
      <NicknameField id="join-request-form-nickname" control={form.control} />
      <div className="space-y-2">
        <AgreeTermsField id="join-request-form-agree-terms" control={form.control} />
        <AgreePrivacyField id="join-request-form-agree-privacy" control={form.control} />
      </div>
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        <UserPlusIcon /> 회원가입
      </Button>
    </form>
  );
}
