import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CrosshairIcon,
  type LucideIcon,
  TrendingUpIcon,
} from 'lucide-react';

const ARTICLE_SORT_OPTIONS: Record<ArticleSort, { icon: LucideIcon; label: string }> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

const QUESTION_SORT_OPTIONS: Record<QuestionSort, { icon: LucideIcon; label: string }> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

export const SORT_OPTIONS: Record<string, Record<Sort, { icon: LucideIcon; label: string }>> = {
  '/search/articles': ARTICLE_SORT_OPTIONS,
  '/search/questions': QUESTION_SORT_OPTIONS,
};
