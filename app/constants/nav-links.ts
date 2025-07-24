import {
  GlobeLockIcon,
  IdCardIcon,
  LayersIcon,
  MessageCircleQuestionIcon,
  PaintbrushIcon,
  ScrollIcon,
  TagIcon,
  UserRoundPenIcon,
} from 'lucide-react';

export const SEARCH_LINKS = [
  { name: '아티클', to: '/search/articles', icon: ScrollIcon },
  { name: '시리즈', to: '/search/series', icon: LayersIcon },
  { name: '질문', to: '/search/questions', icon: MessageCircleQuestionIcon },
  { name: '토픽', to: '/topics', icon: TagIcon },
];

export const MANUAL_LINKS = [
  { name: '아티클', to: '/manual/articles' },
  { name: '시리즈', to: '/manual/series' },
  { name: '질문', to: '/manual/questions' },
];

export const POST_LINKS = [
  {
    name: '아티클 작성하기',
    description: '아티클을 작성하고, 다른 사람들과 공유해보세요.',
    to: '/post/articles',
    icon: ScrollIcon,
  },
  {
    name: '시리즈 작성하기',
    description: '시리즈를 작성하고, 다른 사람들과 공유해보세요.',
    to: '/post/series',
    icon: LayersIcon,
  },
  {
    name: '질문 작성하기',
    description: '질문을 작성하고, 다른 사람들과 공유해보세요.',
    to: '/post/questions',
    icon: MessageCircleQuestionIcon,
  },
];

export const SETTING_LINKS = [
  { name: '계정', to: '/settings/account', icon: IdCardIcon },
  { name: '프로필', to: '/settings/profile', icon: UserRoundPenIcon },
  { name: '개인정보', to: '/settings/privacy', icon: GlobeLockIcon },
  { name: '테마', to: '/settings/theme', icon: PaintbrushIcon },
];

export const LEGAL_LINKS = [
  { name: '이용약관', to: '/legal/terms' },
  { name: '개인정보처리방침', to: '/legal/privacy' },
];

export const CONTACT_LINKS = [
  { name: 'GitHub', to: 'https://github.com' },
  { name: 'Discord', to: 'https://discord.gg' },
  { name: 'X', to: 'https://x.com' },
];
