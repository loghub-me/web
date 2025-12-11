import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';
import { notFound } from 'next/navigation';
import 'server-only';

function afterResponseHook(
  _req: KyRequest,
  _opts: NormalizedOptions,
  res: KyResponse
): Response | void | Promise<Response | void> {
  if (res.status === 404) {
    notFound();
  }
  return res;
}

const serverAPI = ky.create({
  prefixUrl: process.env.API_HOST,
  hooks: { afterResponse: [afterResponseHook] },
});

export { serverAPI };
