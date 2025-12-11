import { ButtonLink } from '@ui/button';
import { Separator } from '@ui/separator';
import { NotepadTextIcon, ChevronRightIcon, LayersIcon, TagIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const POST_MANUALS = [PostManualArticle, PostManualSeries, PostManualQuestion, PostManualTopic];

export default function PostManual() {
  return (
    <section id="post" className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
          포스트 메뉴얼
        </h2>
        <p className="text-secondary-foreground mt-2">
          LogHub에서는 아티클, 시리즈 질문과 답변과 같은 다양한 포스트 유형을 지원합니다.
          <br />각 포스트 유형에 대한 간단한 가이드입니다.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {POST_MANUALS.map((ManualComponent, index) => (
          <Fragment key={index}>
            <ManualComponent />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function PostManualArticle() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex flex-row items-center gap-2.5">
          <NotepadTextIcon className="size-6" />
          <h5 className="text-lg font-semibold">아티클</h5>
          <ButtonLink href={'/search/articles'} variant={'ghost'} size={'icon'} className="ml-auto">
            <ChevronRightIcon />
          </ButtonLink>
        </div>
        <p className="text-secondary-foreground">
          아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.
          <br />
          <strong>단일 주제</strong>의 글을 작성하는 기본 단위로 활용하시면 좋습니다.
          <br />
          썸네일을 지원하며, <strong>16:9</strong> 비율의 이미지를 권장합니다.
        </p>
      </div>
    </div>
  );
}

function PostManualSeries() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex flex-row items-center gap-2.5">
          <LayersIcon className="size-6" />
          <h5 className="text-lg font-semibold">시리즈</h5>
          <ButtonLink href={'/search/series'} variant={'ghost'} size={'icon'} className="ml-auto">
            <ChevronRightIcon />
          </ButtonLink>
        </div>
        <p className="text-secondary-foreground">
          시리즈는 여러 아티클을 모아 하나의 주제로 구성된 <strong>글 모음</strong>입니다.
          <br />
          챕터 간의 흐름이 이어지거나, 유사한 주제를 묶어 체계적으로 정리하고 싶은 경우 사용하시면 좋습니다.
          <br />
          썸네일을 지원하며, <strong>3:4</strong> 비율의 이미지를 권장합니다.
        </p>
      </div>
    </div>
  );
}

function PostManualQuestion() {
  return (
    <div className="space-y-4 lg:col-span-2">
      <div className="space-y-1.5">
        <div className="flex flex-row items-center gap-2.5">
          <LayersIcon className="size-6" />
          <h5 className="text-lg font-semibold">질문과 답변</h5>
          <ButtonLink href={'/search/questions'} variant={'ghost'} size={'icon'} className="ml-auto">
            <ChevronRightIcon />
          </ButtonLink>
        </div>
        <p className="text-secondary-foreground">
          사용자 간의 <strong>질문과 답변(Q&A)</strong>을 공유하는 공간입니다.
          <br />
          특정 주제에 대한 궁금증을 해결하거나, 다른 사용자들과 지식을 나누고 싶을 때 활용하시면 좋습니다.
        </p>
      </div>
    </div>
  );
}

function PostManualTopic() {
  return (
    <div className="space-y-4 lg:col-span-2">
      <div className="space-y-1.5">
        <div className="flex flex-row items-center gap-2.5">
          <TagIcon className="size-6" />
          <h5 className="text-lg font-semibold">토픽</h5>
          <ButtonLink href={'/topics'} variant={'ghost'} size={'icon'} className="ml-auto">
            <ChevronRightIcon />
          </ButtonLink>
        </div>
        <p className="text-secondary-foreground">
          토픽은 특정 주제에 대한 아티클과 시리즈를 모아볼 수 있는 <strong>카테고리</strong>입니다.
          <br />
          관심 있는 주제에 대한 다양한 글을 탐색하고 싶을 때 활용하시면 좋습니다.
          <br />
          <strong>토픽 추가 요청</strong>은 로그인 후,{' '}
          <ButtonLink href={'/topics'} variant={'link'} className="p-0 h-auto text-base">
            토픽 페이지
          </ButtonLink>{' '}
          하단에서 가능합니다.
        </p>
      </div>
    </div>
  );
}
