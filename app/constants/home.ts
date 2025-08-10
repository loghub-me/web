import { BotIcon, LayersIcon, MessagesSquareIcon, PencilIcon, ScrollIcon, SproutIcon, TagIcon } from 'lucide-react';

export const CONTENTS = [
  {
    title: '아티클',
    description: '아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.',
    icon: ScrollIcon,
  },
  {
    title: '시리즈',
    description: '시리즈는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.',
    icon: LayersIcon,
  },
  {
    title: '질문',
    description: '질문은 사용자 간의 질문과 답변을 공유하는 공간입니다.',
    icon: MessagesSquareIcon,
  },
];

export const FEATURES = [
  {
    value: 'markdown-editor',
    title: '마크다운 에디터',
    description: '포스트 작성 시, 마크다운 형식으로 작성할 수 있는 에디터를 제공합니다.',
    icon: PencilIcon,
  },
  {
    value: 'bot-answer',
    title: '답변봇 요청하기',
    description: '질문 등록 시, 답변봇에게 답변을 요청할 수 있습니다.',
    icon: BotIcon,
  },
  {
    value: 'topic',
    title: '토픽',
    description: '포스트 작성 시, 관련된 토픽을 선택하여 콘텐츠를 분류할 수 있습니다.',
    icon: TagIcon,
  },
  {
    value: 'grass-calendar',
    title: '잔디 캘린더',
    description: '포스트 작성 시, 잔디 모양의 캘린더를 통해 활동을 시각적으로 확인할 수 있습니다.',
    icon: SproutIcon,
  },
];
