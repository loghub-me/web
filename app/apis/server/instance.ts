import ky, { type AfterResponseHook, type KyRequest, type KyResponse, type NormalizedOptions } from 'ky';
import { data } from 'react-router';

const afterResponseHook: AfterResponseHook = async (_req: KyRequest, _opts: NormalizedOptions, res: KyResponse) => {
  if (!res.ok) {
    throw data(res.body, res.status);
  }
  return res;
};

export const serverAPI = ky.create({
  prefixUrl: import.meta.env.VITE_API_HOST,
  hooks: { afterResponse: [afterResponseHook] },
});
