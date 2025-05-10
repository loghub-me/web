import { data } from 'react-router';
import { z } from 'zod';
import { ErrorMessage } from '~/constants/error-messages';

export function parseParams<S extends z.ZodObject<any, any>>(params: object, schema: S): z.infer<S> {
  const parsedParams = schema.safeParse(params);

  if (!parsedParams.success) {
    throw data(ErrorMessage.INVALID_PARAMS, { status: 400 });
  }

  return parsedParams.data;
}

export function parseSearchParams<S extends z.ZodObject<any, any>>(
  searchParams: URLSearchParams,
  schema: S
): z.infer<S> {
  const parsedSearchParams = schema.safeParse(Object.fromEntries(searchParams.entries()));

  if (!parsedSearchParams.success) {
    throw data(ErrorMessage.INVALID_SEARCH_PARAMS, { status: 400 });
  }

  return parsedSearchParams.data;
}

export function parseRelativeTime(timestamp: string): string {
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
