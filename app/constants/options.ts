import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CrosshairIcon,
  type LucideIcon,
  TrendingUpIcon,
} from 'lucide-react';

export type IconAndLabel = { icon: LucideIcon; label: string };

export const ARTICLE_SORT_OPTIONS: Record<ArticleSort, IconAndLabel> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

export const SERIES_SORT_OPTIONS: Record<SeriesSort, IconAndLabel> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

export const QUESTION_SORT_OPTIONS: Record<QuestionSort, IconAndLabel> = {
  latest: { icon: CalendarArrowDownIcon, label: '최신순' },
  oldest: { icon: CalendarArrowUpIcon, label: '오래된순' },
  relevant: { icon: CrosshairIcon, label: '관련순' },
  trending: { icon: TrendingUpIcon, label: '인기순' },
};

export const QUESTION_FILTER_OPTIONS: Record<QuestionFilter, { label: string }> = {
  all: { label: 'ALL' },
  open: { label: 'OPEN' },
  closed: { label: 'CLOSED' },
  solved: { label: 'SOLVED' },
};
