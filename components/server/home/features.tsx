import {
  HomeFeatureTabTrigger,
  HomeFeatureMarkdownEditor,
  HomeFeatureAnswerGenerate,
  HomeFeatureActivityCalendar,
  HomeFeatureTopic,
} from '@/components/client/home';
import { Tabs, TabsList, TabsContent } from '@ui/tabs';
import { PencilIcon, BotIcon, SproutIcon, TagIcon } from 'lucide-react';

export default function HomeFeaturesSection() {
  const FEATURES = [
    {
      value: 'markdown-editor',
      title: '마크다운 에디터',
      description: '포스트 작성 시, 마크다운 형식으로 작성할 수 있는 에디터를 제공합니다.',
      icon: PencilIcon,
    },
    {
      value: 'answer-generate',
      title: 'AI 답변 요청',
      description: '질문 등록 시, 답변봇에게 답변을 요청할 수 있습니다.',
      icon: BotIcon,
    },
    {
      value: 'activity-calendar',
      title: '활동 캘린더',
      description: '포스트 작성 시, 잔디 모양의 캘린더를 통해 활동을 시각적으로 확인할 수 있습니다.',
      icon: SproutIcon,
    },
    {
      value: 'topic',
      title: '토픽',
      description: '포스트 작성 시, 관련된 토픽을 선택하여 콘텐츠를 분류할 수 있습니다.',
      icon: TagIcon,
    },
  ];

  return (
    <section className="mt-16 mx-auto px-8 max-w-6xl space-y-8">
      <div className="px-8 space-y-2 md:text-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-primary">
          다양한 기능을 사용해보세요.
        </h3>
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 dark:from-gray-400 to-foreground">
          LogHub는 사용자들이 더 나은 경험을 할 수 있도록 다양한 기능을 제공합니다.
        </p>
      </div>
      <Tabs defaultValue={FEATURES[0].value} className="flex flex-col lg:flex-row gap-4">
        <TabsList className="lg:max-w-1/3 flex flex-col gap-1 items-center">
          {FEATURES.map((feature) => (
            <HomeFeatureTabTrigger key={feature.value} {...feature} />
          ))}
        </TabsList>
        <TabsContent value={'markdown-editor'}>
          <HomeFeatureMarkdownEditor />
        </TabsContent>
        <TabsContent value={'answer-generate'}>
          <HomeFeatureAnswerGenerate />
        </TabsContent>
        <TabsContent value={'activity-calendar'}>
          <HomeFeatureActivityCalendar />
        </TabsContent>
        <TabsContent value={'topic'}>
          <HomeFeatureTopic />
        </TabsContent>
      </Tabs>
    </section>
  );
}
