import {
  ArrowDownWideNarrowIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleXIcon,
  InfoIcon,
  Layers2Icon,
  LayersIcon,
  LucideIcon,
  MessageSquareReplyIcon,
  MessagesSquareIcon,
  MonitorIcon,
  MoonIcon,
  NotepadTextIcon,
  SunIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
} from 'lucide-react';

const ARTICLE_SORT_OPTIONS: Record<ArticleSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  trending: { label: '인기순', icon: TrendingUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
};

const SERIES_SORT_OPTIONS: Record<SeriesSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  trending: { label: '인기순', icon: TrendingUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
};

const QUESTION_SORT_OPTIONS: Record<QuestionSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  trending: { label: '인기순', icon: TrendingUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
};

const QUESTION_STATUS_OPTIONS: Record<QuestionStatus, { label: string; icon: LucideIcon; color: string }> = {
  OPEN: { label: '답변대기', icon: CircleDotIcon, color: 'text-green-500' },
  CLOSED: { label: '닫힘', icon: CircleXIcon, color: 'text-red-500' },
  SOLVED: { label: '해결됨', icon: CircleCheckIcon, color: 'text-purple-500' },
};

const QUESTION_FILTER_OPTIONS: Record<QuestionFilter, { label: string }> = {
  all: { label: '전체' },
  open: { label: '답변대기' },
  closed: { label: '닫힘' },
  solved: { label: '해결됨' },
};

const USER_STAR_TARGET_OPTIONS: Record<UserStarTarget, { label: string; path: string; icon: LucideIcon }> = {
  ARTICLE: { label: '아티클', path: '/articles', icon: NotepadTextIcon },
  SERIES: { label: '시리즈', path: '/series', icon: LayersIcon },
  QUESTION: { label: '질문', path: '/questions', icon: MessagesSquareIcon },
};

const USER_ACTIVITY_ACTION_OPTIONS: Record<UserActivityAction, { label: string; icon: LucideIcon }> = {
  PUBLISH_ARTICLE: { label: '아티클 공개', icon: NotepadTextIcon },
  POST_SERIES: { label: '시리즈 작성', icon: LayersIcon },
  PUBLISH_SERIES_CHAPTER: { label: '시리즈 챕터 공개', icon: Layers2Icon },
  POST_QUESTION: { label: '질문 작성', icon: MessagesSquareIcon },
  POST_QUESTION_ANSWER: { label: '질문 답변 작성', icon: MessageSquareReplyIcon },
};

const THEME_OPTIONS: Record<string, { label: string; icon: LucideIcon }> = {
  system: { label: '시스템 설정', icon: MonitorIcon },
  light: { label: '라이트 모드', icon: SunIcon },
  dark: { label: '다크 모드', icon: MoonIcon },
};

const CHAT_MODEL_OPTIONS: Record<ChatModel, { label: string; icon: string }> = {
  GPT_4_1_MINI: { label: 'GPT-4.1 Mini', icon: 'openai' },
  GPT_5: { label: 'GPT-5', icon: 'openai' },
  O3: { label: 'O3', icon: 'openai' },
};

const NOTIFICATION_TYPE_OPTIONS: Record<NotiifcationType, { icon: LucideIcon; color: string }> = {
  INFO: { icon: InfoIcon, color: 'text-blue-500' },
  SUCCESS: { icon: CircleCheckIcon, color: 'text-green-500' },
  WARNING: { icon: TriangleAlertIcon, color: 'text-yellow-500' },
  ERROR: { icon: CircleXIcon, color: 'text-red-500' },
};

export {
  ARTICLE_SORT_OPTIONS,
  SERIES_SORT_OPTIONS,
  QUESTION_SORT_OPTIONS,
  QUESTION_STATUS_OPTIONS,
  QUESTION_FILTER_OPTIONS,
  USER_STAR_TARGET_OPTIONS,
  USER_ACTIVITY_ACTION_OPTIONS,
  THEME_OPTIONS,
  CHAT_MODEL_OPTIONS,
  NOTIFICATION_TYPE_OPTIONS,
};
