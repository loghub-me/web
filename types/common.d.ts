type SearchParams = { [key: string]: string | string[] | undefined };

interface Page<T> {
  content: T[];
  page: { totalPages: number; totalElements: number };
}

interface SkeletonProps {
  size?: number;
}

interface Content {
  markdown: string;
  html: string;
}

interface Anchor {
  level: number;
  slug: string;
  text: string;
}

type ThumbnailAspectRatio = '16:9' | '3:4';
type ChatModel = 'GPT_4_1_MINI' | 'GPT_5' | 'O3';
