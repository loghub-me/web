import {
  GlobeLockIcon,
  InfoIcon,
  LayersIcon,
  MessageCircleQuestionIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  NotepadTextIcon,
  SettingsIcon,
  TagIcon,
} from 'lucide-react';

const SEARCH_LINKS = [
  {
    label: '아티클',
    href: '/search/articles',
    matchPaths: ['/articles/', '/post/articles', '/edit/articles'],
    icon: NotepadTextIcon,
  },
  {
    label: '시리즈',
    href: '/search/series',
    matchPaths: ['/series/', '/post/series', '/edit/series'],
    icon: LayersIcon,
  },
  {
    label: '질문',
    href: '/search/questions',
    matchPaths: ['/questions/', '/post/questions', '/edit/questions'],
    icon: MessagesSquareIcon,
  },
  { label: '토픽', href: '/topics', icon: TagIcon },
];
const POST_LINKS = [
  {
    href: '/post/articles',
    label: '아티클',
    description: '글을 작성하고 공유해보세요.',
    icon: NotepadTextIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/articles.webp',
      dark: '/images/articles-dark.webp',
    },
  },
  {
    href: '/post/series',
    label: '시리즈',
    description: '글을 묶어서 시리즈로 작성해보세요.',
    icon: LayersIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/series.webp',
      dark: '/images/series-dark.webp',
    },
  },
  {
    href: '/post/questions',
    label: '질문',
    description: '질문을 작성하고 답변을 받아보세요.',
    icon: MessageSquareIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/questions.webp',
      dark: '/images/questions-dark.webp',
    },
  },
  {
    href: '/search/questions',
    label: '답변',
    description: '다른 사람의 질문에 답변해보세요.',
    icon: MessagesSquareIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/questions.webp',
      dark: '/images/questions-dark.webp',
    },
  },
];
const LEGAL_LINKS = [
  { label: '이용약관', href: '/legal#terms' },
  { label: '개인정보처리', href: '/legal#privacy' },
];
const SUPPORT_LINKS = [{ label: '문의하기', href: '/support' }];

const HEADER_LINKS = SEARCH_LINKS;
const FOOTER_LINKS = [
  { label: '탐색', links: SEARCH_LINKS },
  { label: '포스트', links: POST_LINKS },
  { label: '정보', links: LEGAL_LINKS },
  { label: '지원', links: SUPPORT_LINKS },
];
const COMMAND_LINKS = [
  {
    heading: '탐색',
    links: [
      { label: '아티클 검색', href: '/search/articles', icon: NotepadTextIcon },
      { label: '시리즈 검색', href: '/search/series', icon: LayersIcon },
      { label: '질문 검색', href: '/search/questions', icon: MessagesSquareIcon },
      { label: '토픽 검색', href: '/topics', icon: TagIcon },
    ],
  },
  {
    heading: '포스트',
    links: [
      { label: '아티클 작성', href: '/post/articles', icon: NotepadTextIcon },
      { label: '시리즈 작성', href: '/post/series', icon: LayersIcon },
      { label: '질문 작성', href: '/post/questions', icon: MessagesSquareIcon },
    ],
  },
  {
    heading: '정보',
    links: [
      { label: '이용약관', href: '/legal#terms', icon: InfoIcon },
      { label: '개인정보처리', href: '/legal#privacy', icon: GlobeLockIcon },
    ],
  },
  {
    heading: '지원',
    links: [{ label: '문의하기', href: '/support', icon: MessageCircleQuestionIcon }],
  },
  {
    heading: '설정',
    links: [{ label: '설정하기', href: '/settings', icon: SettingsIcon }],
  },
];

export { HEADER_LINKS, FOOTER_LINKS, LEGAL_LINKS, POST_LINKS, COMMAND_LINKS };
