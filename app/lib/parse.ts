import { data } from 'react-router';
import { z } from 'zod';
import { ErrorMessage } from '~/constants/error-messages';

export function parseParams<S extends z.ZodObject<any, any>>(params: object, schema: S): z.infer<S> {
  const parsedParams = schema.safeParse(params);

  if (!parsedParams.success) {
    throw data(ErrorMessage.INVALID_PARAMS, { status: 400 });
  }

  return parsedParams.data;
}

export function parseSearchParams<S extends z.ZodObject<any, any>>(
  searchParams: URLSearchParams,
  schema: S
): z.infer<S> {
  const parsedSearchParams = schema.safeParse(Object.fromEntries(searchParams.entries()));

  if (!parsedSearchParams.success) {
    throw data(ErrorMessage.INVALID_SEARCH_PARAMS, { status: 400 });
  }

  return parsedSearchParams.data;
}
