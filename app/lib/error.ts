import { HTTPError } from 'ky';
import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { refreshToken } from '~/apis/client/auth';
import { ErrorMessage } from '~/constants/error-messages';

export async function handleMessageError(err: Error) {
  if (!(err instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await err.response.json<ErrorResponseBody>();

  if (!body.message) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  toast.error(body.message);
  handleUnauthorizedError(err);
}

export async function handleFormError(err: Error, setError: UseFormSetError<any>) {
  if (!(err instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await err.response.json<ErrorResponseBody>();

  if (body.fieldErrors) {
    for (const field in body.fieldErrors) {
      setError(field, { message: body.fieldErrors[field] });
    }
    return;
  }

  if (!body.message) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  toast.error(body.message);
  handleUnauthorizedError(err);
}

function handleUnauthorizedError(err: Error) {
  toast.promise(() => refreshToken(), {
    loading: '재인증 중...',
    success: '재인증에 성공했습니다.',
    error: '재인증에 실패했습니다. 다시 로그인해주세요.',
  });
}
