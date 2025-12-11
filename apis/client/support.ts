'use client';

import { clientAPI } from '@/apis/client/instance';
import { inquirySchema, topicRequestSchema } from '@/schemas/support';
import { z } from 'zod';

const postInquiry = async (json: z.infer<typeof inquirySchema>) => {
  const email = json.email === '' ? null : json.email;
  return clientAPI.post(`support/inquiry`, { json: { ...json, email } }).json<MethodResponseBody>();
};

const postTopicRequest = async (json: z.infer<typeof topicRequestSchema>) =>
  clientAPI.post(`support/topic/request`, { json: { ...json } }).json<MethodResponseBody>();

export { postInquiry, postTopicRequest };
