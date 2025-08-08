import { z } from 'zod';
import zodFields from '~/schemas/fields';

const { email, nickname, otp, username } = zodFields;

const joinRequestSchema = z.object({ email, username, nickname });
const loginRequestSchema = z.object({ email });

const joinConfirmSchema = z.object({ email, otp });
const loginConfirmSchema = z.object({ email, otp });

const joinConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });
const loginConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

export {
  joinRequestSchema,
  loginRequestSchema,
  joinConfirmSchema,
  loginConfirmSchema,
  joinConfirmSearchParamsSchema,
  loginConfirmSearchParamsSchema,
};
