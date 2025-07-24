import Logo from '~/components/global/logo';
import {
  ContentList,
  ContentListItem,
  FeatureTabsContent,
  FeatureTabsTrigger,
  HomeAuthLinks,
  HomeDescription,
  HomeManualLink,
  HomeTopicIcons,
} from '~/components/home';
import { Tabs, TabsList } from '~/components/ui/tabs';
import { CONTENTS, FEATURES } from '~/constants/home';

export default function HomeIndex() {
  return (
    <main className="container mx-auto p-4 pt-16 min-h-screen">
      <section className="py-12 flex flex-col items-center gap-8">
        <HomeManualLink />
        <Logo width={256} height={64} className={'mx-auto'} />
        <HomeDescription />
        <HomeAuthLinks />
      </section>
      <HomeTopicIcons />
      <section className="px-4 py-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-center font-semibold text-2xl">주요 콘텐츠를 탐색하세요</h2>
          <p className="text-center text-sm text-muted-foreground">
            다양한 주제의 아티클, 시리즈, 질문을 통해 지식을 확장하고 커뮤니티와 소통하세요.
          </p>
        </div>
        <ContentList>
          {CONTENTS.map((content) => (
            <ContentListItem key={content.title} {...content} />
          ))}
        </ContentList>
      </section>
      <section className="px-4 py-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-center font-semibold text-2xl">특별한 기능을 소개합니다</h2>
          <p className="text-center text-sm text-muted-foreground">
            이 기능들은 사용자 경험을 향상시키고, 더 나은 콘텐츠를 생성하는 데 도움을 줍니다.
          </p>
        </div>
        <Tabs defaultValue={FEATURES[0].value} className="w-full flex flex-col lg:flex-row gap-4">
          <TabsList className="lg:max-w-1/3 flex flex-col gap-1 items-center">
            {FEATURES.map((feature) => (
              <FeatureTabsTrigger key={feature.value} {...feature} />
            ))}
          </TabsList>
          {FEATURES.map((feature) => (
            <FeatureTabsContent key={feature.value} {...feature} />
          ))}
        </Tabs>
      </section>
    </main>
  );
}
