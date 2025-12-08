import { ErrorMessage } from '@/constants/messages';
import { notFound } from 'next/navigation';
import { z } from 'zod';

export function parseObject<S extends z.ZodTypeAny>(obj: unknown, schema: S): z.infer<S> {
  const input = obj instanceof URLSearchParams ? Object.fromEntries(obj) : obj;

  const result = schema.safeParse(input);
  if (!result.success) {
    console.error(ErrorMessage.PARSE_ERROR, result.error.message);
    notFound();
  }

  return result.data;
}

export function parseRelativeTime(timestamp: string | number): string {
  const date = new Date(timestamp);
  const now = new Date();

  // 현재 시간과 입력된 시간의 차이를 밀리초 단위로 계산
  const diffInMs = now.getTime() - date.getTime();

  // 차이를 초, 분, 시간, 일, 월, 년 단위로 변환
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  } else {
    return `${diffInYears}년 전`;
  }
}
