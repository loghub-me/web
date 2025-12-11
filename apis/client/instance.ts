'ues client';

import { ErrorMessage } from '@/constants/messages';
import ky, { HTTPError, KyRequest, KyResponse, NormalizedOptions, Options } from 'ky';

let locked = false;

function beforeRequestHook(req: KyRequest): void | Promise<void> {
  if (req.method !== 'GET') {
    if (locked) {
      throw new Error(ErrorMessage.WAITING_FOR_RESPONSE);
    }
    locked = true;
  }
}

function afterResponseHook(
  req: KyRequest,
  _opts: NormalizedOptions,
  res: KyResponse
): Response | void | Promise<Response | void> {
  if (req.method !== 'GET' && locked) {
    locked = false;
  }
  return res;
}

function beforeErrorHook(error: HTTPError): HTTPError | Promise<HTTPError> {
  const req = error.request;
  if (req.method !== 'GET' && locked) {
    locked = false;
  }
  throw error;
}

let clientAPI = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_HOST,
  credentials: 'include',
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
    beforeError: [beforeErrorHook],
  },
});

function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
}

export { clientAPI, extendClientAPIConfig };
