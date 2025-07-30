import { jwtDecode } from 'jwt-decode';
import ky, { type KyResponse } from 'ky';
import { z } from 'zod';
import { clientAPI, extendClientAPIConfig } from '~/apis/client/instance';
import type { joinConfirmSchema, joinRequestSchema, loginConfirmSchema, loginRequestSchema } from '~/schemas/auth';

export const requestJoin = (json: z.infer<typeof joinRequestSchema>) => clientAPI.post('auth/join/request', { json });
export const requestLogin = (json: z.infer<typeof loginRequestSchema>) =>
  clientAPI.post('auth/login/request', { json });

export const confirmJoin = (json: z.infer<typeof joinConfirmSchema>) =>
  clientAPI
    .post('auth/join/confirm', { json })
    .then(extractTokenFromResponse)
    .then((token) => {
      setAuthorizationHeader(token);
      return token;
    });
export const confirmLogin = (json: z.infer<typeof loginConfirmSchema>) =>
  clientAPI
    .post(`auth/login/confirm`, { json })
    .then(extractTokenFromResponse)
    .then((token) => {
      setAuthorizationHeader(token);
      return token;
    });

export const refreshToken = () =>
  ky
    .post(`${import.meta.env.VITE_API_HOST}/auth/refresh`, { credentials: 'include', keepalive: true })
    .then(extractTokenFromResponse)
    .then((token) => {
      setAuthorizationHeader(token);
      return token;
    });

export const logout = () => clientAPI.post('auth/logout').json<MessageResponseBody>();

function extractTokenFromResponse(res: KyResponse): string {
  const authHeader = res.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid Authorization header found');
  }

  return authHeader.slice(7);
}

function setAuthorizationHeader(token: string) {
  extendClientAPIConfig({ headers: { Authorization: `Bearer ${token}` } });
}

export function extractSessionFromToken(token: string) {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return {
    id: decodedToken.sub,
    email: decodedToken.email,
    username: decodedToken.username,
    nickname: decodedToken.nickname,
    joinedAt: decodedToken.joinedAt,
    role: decodedToken.role,
  } as Session;
}
