'use client';

import { blockEmail } from '@/apis/client/auth';
import { handleError } from '@/lib/error';
import { emailBlockSearchParamsSchema } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

interface EmailBlockSearchParams {
  defaultValues: z.infer<typeof emailBlockSearchParamsSchema>;
}

export default function EmailBlockForm({ defaultValues }: Readonly<EmailBlockSearchParams>) {
  const router = useRouter();

  useEffect(() => {
    blockEmail(defaultValues)
      .then(({ message }) => toast.success(message))
      .catch(handleError)
      .finally(() => router.replace('/'));
  }, [defaultValues.token, blockEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
