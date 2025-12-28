type SearchParams = { [key: string]: string | string[] | undefined };

interface Page<T> {
  content: T[];
  page: { totalPages: number; totalElements: number };
}

interface SkeletonProps {
  size?: number;
}

interface Content {
  html: string;
  normalized: string;
}

interface Anchor {
  level: number;
  slug: string;
  text: string;
}

interface SitemapItem {
  url: string;
  lastModified?: string | Date | undefined;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined;
  priority?: number | undefined;
  images?: string[] | undefined;
}

type ThumbnailAspectRatio = '16:9' | '3:4';
type ChatModel = 'GPT_4_1_MINI' | 'GPT_5' | 'O3';
