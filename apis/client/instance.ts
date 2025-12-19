'ues client';

import { refreshToken } from '@/apis/client/auth';
import ky, { KyRequest, KyResponse, NormalizedOptions, Options } from 'ky';

function afterResponseHook(
  req: KyRequest,
  _opts: NormalizedOptions,
  res: KyResponse
): Response | void | Promise<Response | void> {
  if (res.status === 401) {
    return refreshToken()
      .then(() => clientAPI(req))
      .catch(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:refresh-failed'));
        }
        return res;
      });
  }

  return res;
}

let clientAPI = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_HOST,
  credentials: 'include',
  hooks: {
    afterResponse: [afterResponseHook],
  },
});

function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
}

export { clientAPI, extendClientAPIConfig };
