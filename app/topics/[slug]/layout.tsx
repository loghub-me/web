import { getTopicDetail } from '@/apis/server/topic';
import { TopicDetailNav } from '@/components/client/topic';
import ThemedImage from '@/components/global/themed-image';
import { TopicDetailAside, TopicDetailAsideSkeleton } from '@/components/server/topic';
import { parseObject } from '@/lib/parse';
import { buildAssetsUrl } from '@/lib/utils';
import { topicDetailSchema } from '@/schemas/topic';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({ params }: LayoutProps<'/topics/[slug]'>): Promise<Metadata> {
  const { slug } = parseObject(await params, topicDetailSchema);
  const topic = await getTopicDetail(slug);
  const [title, description] = [topic.name, topic.description];
  const url = `${process.env.WEB_HOST}/topics/${slug}`;
  const images = [buildAssetsUrl(`icons/${slug}.svg`)];
  return {
    title: topic.name,
    description: topic.description,
    openGraph: { title, description, url, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function TopicDetailLayout({ params, children }: LayoutProps<'/topics/[slug]'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const topic = getTopicDetail(parsedParam.slug);

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-8">
        <TopicDetailAside>
          <Suspense fallback={<TopicDetailAsideSkeleton />}>
            <TopicDetailAsideContent topic={topic} />
          </Suspense>
        </TopicDetailAside>
        <div className="flex-1 space-y-4">
          <TopicDetailNav {...parsedParam} />
          {children}
        </div>
      </div>
    </main>
  );
}

interface TopicDetailAsideContentProps {
  topic: Promise<TopicDetail>;
}

async function TopicDetailAsideContent({ topic }: Readonly<TopicDetailAsideContentProps>) {
  const { slug, name, description } = await topic;

  return (
    <>
      <div className="relative w-xs aspect-square bg-card border rounded-xl shadow-xs overflow-hidden">
        <ThemedImage
          src={{
            light: buildAssetsUrl(`icons/${slug}.svg`),
            dark: buildAssetsUrl(`icons/${slug}-dark.svg`),
          }}
          alt={name}
          fill
          className="p-6"
        />
      </div>
      <div className="w-full space-y-1.5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );
}
