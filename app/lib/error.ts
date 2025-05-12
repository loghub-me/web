import { HTTPError } from 'ky';
import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorMessage } from '~/constants/error-messages';

export async function handleMessageError(err: Error) {
  if (!(err instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await err.response.json<ErrorResponseBody>();

  if (body.message) {
    toast.error(body.message);
  }
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
  }

  if (body.message) {
    toast.error(body.message);
  }
}
