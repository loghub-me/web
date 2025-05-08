import { jwtDecode } from 'jwt-decode';
import ky, { type KyResponse } from 'ky';
import { z } from 'zod';
import { clientAPI, extendClientAPIConfig } from '~/apis/client/instance';
import { joinConfirmSchema, joinRequestSchema, loginConfirmSchema, loginRequestSchema } from '~/schemas/auth';

export const requestJoin = (json: z.infer<typeof joinRequestSchema>) => clientAPI.post('auth/join/request', { json });
export const requestLogin = (json: z.infer<typeof loginRequestSchema>) =>
  clientAPI.post('auth/login/request', { json });

export const confirmJoin = (json: z.infer<typeof joinConfirmSchema>) =>
  clientAPI.post('auth/join/confirm', { json }).then(extractSession);
export const confirmLogin = (json: z.infer<typeof loginConfirmSchema>) =>
  clientAPI.post(`auth/login/confirm`, { json }).then(extractSession);

export const refreshToken = () =>
  ky.post('/api/auth/refresh', { credentials: 'include', keepalive: true }).then(extractSession);

export const logout = () =>
  clientAPI
    .post('auth/logout')
    .json<MessageResponseBody>()
    .then((body) => {
      extendClientAPIConfig({ headers: {} });
      return body;
    });

function extractSession(res: KyResponse): Session {
  const Authorization = res.headers.get('Authorization');

  if (!Authorization || !Authorization.startsWith('Bearer ')) {
    throw new Error();
  }

  extendClientAPIConfig({ headers: { Authorization } });

  const token = Authorization.slice(7);
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return {
    id: decodedToken.sub,
    email: decodedToken.email,
    username: decodedToken.username,
    nickname: decodedToken.nickname,
    avatar: decodedToken.avatar,
    role: decodedToken.role,
  } as Session;
}
