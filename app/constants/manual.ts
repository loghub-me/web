import { PencilIcon, SearchIcon } from 'lucide-react';

export const manual = {
  article: {
    title: '아티클 가이드',
    description: '이 페이지는 블로그 아티클 작성 시 참고할 수 있는 가이드를 제공합니다.',
    content: '아티클은 블로그 형태로 기술적인 내용을 공유하는 공간입니다. 댓글 기능을 포함합니다.',
    links: [
      {
        icon: SearchIcon,
        to: '/search/article',
        label: '아티클 검색',
        description: '키워드로 검색하거나 카테고리별로 필터링할 수 있습니다.',
      },
      {
        icon: PencilIcon,
        to: '/post/article',
        label: '아티클 작성',
        description: '새로운 아티클을 작성할 수 있습니다.',
      },
    ],
  },
  series: {
    title: '시리즈 가이드',
    description: '이 페이지는 시리즈 작성 시 참고할 수 있는 가이드를 제공합니다.',
    content: '시리즈는 여러 개의 챕터를 포함하는 아티클의 모음입니다. 리뷰 기능을 포함합니다.',
    links: [
      {
        icon: SearchIcon,
        to: '/search/series',
        label: '시리즈 검색',
        description: '키워드로 검색하거나 카테고리별로 필터링할 수 있습니다.',
      },
      {
        icon: PencilIcon,
        to: '/post/series',
        label: '시리즈 작성',
        description: '새로운 시리즈를 작성할 수 있습니다.',
      },
    ],
  },
  question: {
    title: '질문 가이드',
    description: '이 페이지는 질문 작성 시 참고할 수 있는 가이드를 제공합니다.',
    content:
      '질문은 개발자들이 질문을 올리고 답변을 받을 수 있는 공간입니다. LLM 기반의 답변 생성 봇 기능을 포함합니다.',
    links: [
      {
        icon: SearchIcon,
        to: '/search/question',
        label: '질문 검색',
        description: '키워드로 검색하거나 카테고리별로 필터링할 수 있습니다.',
      },
      {
        icon: PencilIcon,
        to: '/post/question',
        label: '질문 작성',
        description: '새로운 질문을 작성할 수 있습니다.',
      },
    ],
  },
};
