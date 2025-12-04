import { TopicRequest, TopicSearch } from '@/components/client/topic';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '토픽 검색',
  description: 'LogHub에서 다루는 다양한 토픽을 검색해보세요.',
};

export default function TopicSearchPage() {
  return (
    <main className="mx-auto p-4 pt-20 max-w-5xl w-full min-h-screen space-y-4">
      <TopicSearch />
      <div className="py-2 flex justify-center">
        <TopicRequest />
      </div>
    </main>
  );
}
