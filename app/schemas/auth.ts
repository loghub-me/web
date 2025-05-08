import { z } from 'zod';
import { emailZod as email, nicknameZod as nickname, otpZod as otp, usernameZod as username } from '~/schemas/zod';

export const joinRequestSchema = z.object({ email, username, nickname });
export const loginRequestSchema = z.object({ email });

export const joinConfirmSchema = z.object({ email, otp });
export const loginConfirmSchema = z.object({ email, otp });

export const joinConfirmSearchParamsSchema = z.object({ email });
export const loginConfirmSearchParamsSchema = z.object({ email });
