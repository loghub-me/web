import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWebUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_WEB_HOST}/${path}`;
}

export function buildAPIUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_API_HOST}/${path}`;
}

export function buildAssetsUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_ASSETS_HOST}/${path}`;
}
