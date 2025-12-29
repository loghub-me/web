'use client';

import { clientAPI } from '@/apis/client/instance';
import { buildAPIUrl } from '@/lib/utils';
import {
  joinConfirmSchema,
  joinRequestSchema,
  loginConfirmSchema,
  loginRequestSchema,
  oauth2JoinConfirmSchema,
} from '@/schemas/auth';
import { jwtDecode } from 'jwt-decode';
import ky, { KyResponse } from 'ky';
import { z } from 'zod';

const requestJoin = (json: z.infer<typeof joinRequestSchema>) =>
  clientAPI.post('auth/join/request', { json }).json<MessageResponseBody>();
const confirmJoin = (json: z.infer<typeof joinConfirmSchema>) =>
  clientAPI.post('auth/join/confirm', { json }).then(afterConfirm);
const confirmOAuth2Join = (json: z.infer<typeof oauth2JoinConfirmSchema>) =>
  clientAPI.post('oauth2/join/confirm', { json }).then(afterConfirm);

const requestLogin = (json: z.infer<typeof loginRequestSchema>) =>
  clientAPI.post('auth/login/request', { json }).json<MessageResponseBody>();
const confirmLogin = (json: z.infer<typeof loginConfirmSchema>) =>
  clientAPI.post('auth/login/confirm', { json }).then(afterConfirm);

const logout = () =>
  clientAPI.post('auth/logout').then(async (res) => {
    const body = await res.json<MessageResponseBody>();
    window.dispatchEvent(new CustomEvent('auth:logged-out'));
    return body;
  });

let refreshTokenPromise: Promise<MessageResponseBody> | null = null;
const refreshToken = async () => {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  refreshTokenPromise = ky
    .post(buildAPIUrl('auth/refresh'), { credentials: 'include', keepalive: true })
    .then(afterConfirm)
    .catch((err) => {
      window.dispatchEvent(new CustomEvent('auth:refresh-failed'));
      throw err;
    })
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};

async function afterConfirm(res: KyResponse) {
  const body = await res.json<MessageResponseBody>();
  const token = extractTokenFromResponse(res);
  const session = extractSessionFromToken(token);
  window.dispatchEvent(new CustomEvent('auth:access-token-generated', { detail: { token, session } }));
  return body;
}

function extractTokenFromResponse(res: KyResponse): string {
  const authHeader = res.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid Authorization header found');
  }

  return authHeader.slice(7);
}

function extractSessionFromToken(token: string) {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return {
    id: Number(decodedToken.sub),
    email: decodedToken.email,
    username: decodedToken.username,
    nickname: decodedToken.nickname,
    role: decodedToken.role,
  } as Session;
}

export { requestJoin, confirmJoin, confirmOAuth2Join };
export { requestLogin, confirmLogin };
export { logout, refreshToken };
