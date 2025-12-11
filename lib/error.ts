'use client';

import { refreshToken } from '@/apis/client/auth';
import { ErrorMessage } from '@/constants/messages';
import { HTTPError } from 'ky';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

export async function handleFormError<TFieldValues extends FieldValues>(
  error: Error,
  setError: UseFormSetError<TFieldValues>
) {
  if (!(error instanceof HTTPError)) {
    const errorMessage = error instanceof Error ? error.message : ErrorMessage.UNKNOWN;
    toast.error(errorMessage);
    return;
  }

  const body = await error.response.json<ErrorResponseBody>();
  if (body.fieldErrors) {
    for (const [field, message] of Object.entries(body.fieldErrors)) {
      setError(field as FieldPath<TFieldValues>, { message });
    }
    return;
  }

  toast.error(body.message);
  handleUnauthorizedError(error);
}

export async function handleError(error: Error) {
  if (!(error instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await error.response.json<ErrorResponseBody>();
  if (body.message) {
    toast.error(body.message);
    handleUnauthorizedError(error);
    return;
  }
  if (body.fieldErrors) {
    toast.error(
      Object.values(body.fieldErrors)
        .map((msg) => `${msg}`)
        .join('\n')
    );
    return;
  }

  toast.error(ErrorMessage.UNKNOWN);
}

function handleUnauthorizedError(error: HTTPError) {
  if (error.response.status === 401) {
    toast.promise(() => refreshToken(), {
      loading: '재인증 중...',
      success: '재인증에 성공했습니다.',
      error: '재인증에 실패했습니다. 다시 로그인해주세요.',
    });
  }
}
