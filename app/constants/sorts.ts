import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CrosshairIcon,
  type LucideIcon,
  TrendingUpIcon,
} from 'lucide-react';

export const ARTICLE_SORT_OPTIONS: Record<ArticleSort, { icon: LucideIcon; label: string }> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

export const QUESTION_SORT_OPTIONS: Record<ArticleSort, { icon: LucideIcon; label: string }> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};
